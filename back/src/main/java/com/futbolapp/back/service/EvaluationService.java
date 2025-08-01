package com.futbolapp.back.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.futbolapp.back.client.MatchAPIClient;
import com.futbolapp.back.dto.MatchDTO;
import com.futbolapp.back.dto.MatchResponseDTO;
import com.futbolapp.back.dto.MatchSummaryDTO;
import com.futbolapp.back.dto.PredictionDTO;
import com.futbolapp.back.dto.TournamentDTO;
import com.futbolapp.back.dto.TournamentRulesDTO;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class EvaluationService {

    private final MatchService matchService;

    public EvaluationService(MatchService matchService) {
        this.matchService = matchService;
    }

    public List<PredictionDTO> evaluateAndReturnPredictions(String tournamentId, String userId)

            throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot tournamentSnap = db.collection("tournaments")
                .document(tournamentId).get().get();
        TournamentDTO tournament = tournamentSnap.toObject(TournamentDTO.class);

        if (tournament == null)
            throw new RuntimeException("Tournament not found");

        List<QueryDocumentSnapshot> predictionDocs = db.collection("predictions")
                .whereEqualTo("tournamentId", tournamentId)
                .whereEqualTo("userId", userId)
                .get().get().getDocuments();

        System.out.println(predictionDocs.size() + " "
                + predictionDocs.stream().map(doc -> doc.getId()).collect(Collectors.joining(", "))
                + " predictions found for tournament " + tournamentId);
        List<MatchSummaryDTO> realMatches = matchService.getMatchSummaries();
        if (realMatches == null || realMatches.isEmpty())
            throw new RuntimeException("Match results not available");

        Map<String, MatchSummaryDTO> matchMap = realMatches.stream()
                .collect(Collectors.toMap(MatchSummaryDTO::getId, m -> m));

        System.out.println("Match summaries loaded: " + matchMap.size() + " "
                + matchMap.keySet().stream().collect(Collectors.joining(", ")) +
                " for tournament " + tournamentId);
        Map<String, Integer> userTotalPoints = new HashMap<>();
        List<PredictionDTO> evaluatedPredictions = new ArrayList<>();

        for (QueryDocumentSnapshot doc : predictionDocs) {
            PredictionDTO prediction = doc.toObject(PredictionDTO.class);
            MatchSummaryDTO match = matchMap.get(prediction.getMatchId());

            if (match == null || !"FINISHED".equals(match.getStatus()))
                continue;

            int points = calculatePoints(prediction, match, tournament.getRules());
            userTotalPoints.merge(prediction.getUserId(), points, Integer::sum);

            prediction.setPointsAwarded(points);
            prediction.setEvaluated(true);

            db.collection("predictions").document(doc.getId()).set(prediction, SetOptions.merge());
            evaluatedPredictions.add(prediction);
        }

        //save the data correctly
        for (Map.Entry<String, Integer> entry : userTotalPoints.entrySet()) {
            db.collection("tournaments")
                    .document(tournamentId)
                    .collection("participants")
                    .document(entry.getKey())
                    .set(Map.of("points", entry.getValue()), SetOptions.merge());
        }

        return evaluatedPredictions;
    }

    private int calculatePoints(PredictionDTO prediction, MatchSummaryDTO match, TournamentRulesDTO rules) {
        boolean exact = prediction.getHomeTeamScore() == match.getFullTimeScore().getHome() &&
                prediction.getAwayTeamScore() == match.getFullTimeScore().getAway();

        String predictedWinner = getWinner(prediction.getHomeTeamScore(), prediction.getAwayTeamScore());
        String realWinner = match.getWinner();

        if (exact)
            return rules.getPointsPerExactScore();
        if ("DRAW".equals(predictedWinner) && "DRAW".equals(realWinner))
            return rules.getPointsPerDraw();
        if (predictedWinner.equals(realWinner))
            return rules.getPointsPerWin();

        return 0;
    }

    private String getWinner(int home, int away) {
        return home > away ? "HOME_TEAM" : away > home ? "AWAY_TEAM" : "DRAW";
    }
}
