package com.futbolapp.back.service;

import com.futbolapp.back.dto.JoinRequestDTO;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class RequestJoinTournamentService {

    //allways inject the firestore client
    private final Firestore db;
    public RequestJoinTournamentService(Firestore db) {
        this.db = db;
    }

    private static final String TOURNAMENTS_COLLECTION = "tournaments";

    public void requestToJoin(String tournamentId, JoinRequestDTO request)
            throws ExecutionException, InterruptedException {

        System.out.println("📥 JoinRequestDTO: uid=" + request.getUid() + ", username=" + request.getUsername());

        if (tournamentId == null || tournamentId.trim().isEmpty()) {
            throw new IllegalArgumentException("❌ tournamentId is required.");
        }

        if (request == null || request.getUid() == null || request.getUid().trim().isEmpty()) {
            throw new IllegalArgumentException("❌ request.uid is missing.");
        }

       // Firestore db = FirestoreClient.getFirestore();

        DocumentReference requestDoc = db
                .collection("tournaments")
                .document(tournamentId)
                .collection("pendingRequests")
                .document(request.getUid());

        ApiFuture<WriteResult> result = requestDoc.set(request);
        result.get(); // optional
    }

    public void acceptRequest(String tournamentId, String userId) throws ExecutionException, InterruptedException {
       // Firestore db = FirestoreClient.getFirestore();

        // 1. Reference to the pending request
        DocumentReference requestDocRef = db.collection(TOURNAMENTS_COLLECTION)
                .document(tournamentId)
                .collection("pendingRequests")
                .document(userId);

        DocumentSnapshot requestSnapshot = requestDocRef.get().get();
        if (!requestSnapshot.exists()) {
            throw new RuntimeException("Join request not found for user: " + userId);
        }

        // 2. Extract user details from the request
        String email = requestSnapshot.getString("email");
        String username = requestSnapshot.getString("username");

        if (username == null)
            username = "Unknown";
        if (email == null)
            email = "";

        // 3. Add the user as a participant in the tournament's subcollection
        DocumentReference participantRef = db.collection(TOURNAMENTS_COLLECTION)
                .document(tournamentId)
                .collection("participants")
                .document(userId);

        Map<String, Object> participantData = new HashMap<>();
        participantData.put("userId", userId);
        participantData.put("username", username);
        participantData.put("email", email);
        participantData.put("points", 0);
        participantData.put("joinedAt", FieldValue.serverTimestamp());

        participantRef.set(participantData).get();

        // 4. Update the user document to include this tournament in
        // tournamentsParticipant
        DocumentReference userRef = db.collection("users").document(userId);
        Map<String, Object> userUpdate = new HashMap<>();
        userUpdate.put("tournamentsParticipant", FieldValue.arrayUnion(tournamentId));
        userRef.update(userUpdate).get();

        // 5. Delete the original join request
        requestDocRef.delete().get();
    }

    public void rejectRequest(String tournamentId, String userId) {
       // Firestore db = FirestoreClient.getFirestore();
        db.collection(TOURNAMENTS_COLLECTION)
                .document(tournamentId)
                .collection("pendingRequests")
                .document(userId)
                .delete();
    }
}
