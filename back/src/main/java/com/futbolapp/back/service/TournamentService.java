package com.futbolapp.back.service;


import com.futbolapp.back.dto.TournamentRequest;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TournamentService {

    public Map<String, String> createTournament(TournamentRequest request) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        Map<String, Object> tournamentData = new HashMap<>();
        tournamentData.put("name", request.getName());
        tournamentData.put("ownerId", request.getOwnerId());
        tournamentData.put("idCompetition", request.getIdCompetition());
        tournamentData.put("competitionName", request.getCompetitionName());
        tournamentData.put("rules", request.getRules());
        tournamentData.put("participants", request.getParticipants());
        tournamentData.put("createdAt", FieldValue.serverTimestamp());

        ApiFuture<DocumentReference> addedDocRef = db.collection("tournaments").add(tournamentData);
        String generatedId = addedDocRef.get().getId();

        // Update the tournament with its own generated ID
        db.collection("tournaments").document(generatedId).update("id", generatedId);

        return Map.of(
            "message", "Tournament created successfully",
            "tournamentId", generatedId
        );
    }

    public Map<String, Object> getTournamentById(String id) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("tournaments").document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new Exception("Tournament not found with ID: " + id);
        }

        return snapshot.getData(); // Return raw data as Map<String, Object>
    }
}
