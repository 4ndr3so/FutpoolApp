package com.futbolapp.back.service;

import com.futbolapp.back.dto.MatchSummaryDTO;
import com.futbolapp.back.dto.PredictionDTO;
import com.futbolapp.back.dto.TournamentDTO;
import com.futbolapp.back.dto.TournamentRulesDTO;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ExecutionException;

// @Service
public class EvaluationService {

    private final Firestore db = FirestoreClient.getFirestore();
    private final RestTemplate restTemplate;

    @Autowired
    public EvaluationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    
    public void evaluatePredictions(String tournamentId) throws ExecutionException, InterruptedException {
        // 1. Get tournament info
        DocumentSnapshot tournamentSnap = db.collection("tournaments").document(tournamentId).get().get();
        TournamentDTO tournament = tournamentSnap.toObject(TournamentDTO.class);

        if (tournament == null) throw new RuntimeException("Tournament not found");

        // 2. Get predictions for this tournament
        Query query = db.collection("predictions").whereEqualTo("tournamentId", tournamentId);
        List<QueryDocumentSnapshot> predictionDocs = query.get().get().getDocuments();

        // 3. Fetch real matches from external API
        MatchSummaryDTO[] realMatches = restTemplate.getForObject(
            "http://localhost:3001/matches", MatchSummaryDTO[].class);

        if (realMatches == null) throw new RuntimeException("Match results not available");

        Map<String, MatchSummaryDTO> matchMap = new HashMap<>();
        for (MatchSummaryDTO match : realMatches) {
            matchMap.put(match.getUtcDate(), match); // matchId is utcDate in this example
        }

        // 4. Evaluate predictions and update scores
        Map<String, Integer> userTotalPoints = new HashMap<>();

        for (QueryDocumentSnapshot doc : predictionDocs) {
            PredictionDTO prediction = doc.toObject(PredictionDTO.class);
            MatchSummaryDTO match = matchMap.get(prediction.getMatchId());

            if (match == null || !"FINISHED".equals(match.getStatus())) continue;

            int points = calculatePoints(prediction, match, tournament.getRules());
            userTotalPoints.merge(prediction.getUserId(), points, Integer::sum);

            db.collection("predictions").document(doc.getId()).update(
                Map.of("pointsAwarded", points, "evaluated", true)
            );
        }

        // 5. Update participant scores in tournament
        for (Map.Entry<String, Integer> entry : userTotalPoints.entrySet()) {
            db.collection("tournaments")
              .document(tournamentId)
              .update("participants." + entry.getKey(), entry.getValue());
        }
    }

    private int calculatePoints(PredictionDTO prediction, MatchSummaryDTO match, TournamentRulesDTO rules) {
        boolean exact = prediction.getHomeTeamScore() == match.getFullTimeScore().getHome() &&
                        prediction.getAwayTeamScore() == match.getFullTimeScore().getAway();

        String predictedWinner = getWinner(prediction.getHomeTeamScore(), prediction.getAwayTeamScore());
        String realWinner = match.getWinner();

        if (exact) return rules.getPointsPerExactScore();
        if ("DRAW".equals(predictedWinner) && "DRAW".equals(realWinner)) return rules.getPointsPerDraw();
        if (predictedWinner.equals(realWinner)) return rules.getPointsPerWin();

        return 0;
    }

    private String getWinner(int home, int away) {
        return home > away ? "HOME_TEAM" : away > home ? "AWAY_TEAM" : "DRAW";
    }


}
