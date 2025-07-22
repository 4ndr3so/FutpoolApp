package com.futbolapp.back.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futbolapp.dto.TournamentRequest;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    @PostMapping
    public ResponseEntity<Map<String, String>> createTournament(@RequestBody TournamentRequest request) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            Map<String, Object> tournamentData = new HashMap<>();
            tournamentData.put("name", request.getName());
            tournamentData.put("ownerId", request.getOwnerId());
            tournamentData.put("rules", request.getRules());
            tournamentData.put("participants", request.getParticipants());
            tournamentData.put("createdAt", FieldValue.serverTimestamp());

            // Add to collection and let Firestore generate ID
            ApiFuture<DocumentReference> addedDocRef = db.collection("tournaments").add(tournamentData);
            String generatedId = addedDocRef.get().getId();

            // Optionally: update the document to include its ID
            db.collection("tournaments").document(generatedId).update("id", generatedId);

            return ResponseEntity.ok(Map.of(
                "message", "Tournament created successfully",
                "tournamentId", generatedId
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to create tournament: " + e.getMessage()));
        }
    }
}
