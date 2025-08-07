package com.futbolapp.back.service;

import com.futbolapp.back.dto.JoinRequestDTO;
import com.futbolapp.back.dto.JoinTournamentRequestDTO;
import com.futbolapp.back.dto.ParticipantResponse;
import com.futbolapp.back.dto.TournamentDTO;
import com.futbolapp.back.dto.TournamentRequest;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TournamentService {

    // always inject the firestore client
    private final Firestore db;
    public TournamentService(Firestore db) {
        this.db = db;
    }

    public Map<String, String> createTournament(TournamentRequest request) throws Exception {
    //    Firestore db = FirestoreClient.getFirestore();
        System.out.println("Creating tournament with request: " + request);
        Map<String, Object> tournamentData = new HashMap<>();
        tournamentData.put("name", request.getName());
        tournamentData.put("ownerId", request.getOwnerId());
        tournamentData.put("idCompetition", request.getIdCompetition());
        tournamentData.put("competitionName", request.getCompetitionName());
        tournamentData.put("rules", request.getRules());
        tournamentData.put("createdAt", FieldValue.serverTimestamp());

        // 1. Add tournament document
        ApiFuture<DocumentReference> addedDocRef = db.collection("tournaments").add(tournamentData);
        DocumentReference docRef = addedDocRef.get();
        String generatedId = docRef.getId();

        // 2. Set the ID inside the tournament document
        docRef.update("id", generatedId);

        // 3. Add each participant in the subcollection
        if (request.getParticipants() != null) {
            for (String userId : request.getParticipants()) {
                Map<String, Object> participantData = new HashMap<>();
                participantData.put("userId", userId);
                participantData.put("points", 0);
                participantData.put("joinedAt", Instant.now());
                participantData.put("username", request.getOwnerName()); // 

                db.collection("tournaments")
                        .document(generatedId)
                        .collection("participants")
                        .document(userId)
                        .set(participantData);
            }
        }

        // 4. Update owner document with tournamentsOwn
        db.collection("users")
                .document(request.getOwnerId())
                .update("tournamentsOwn", FieldValue.arrayUnion(generatedId));

        // 5. Update all participants with tournamentsParticipant
        if (request.getParticipants() != null) {
            for (String userId : request.getParticipants()) {
                db.collection("users")
                        .document(userId)
                        .update("tournamentsParticipant", FieldValue.arrayUnion(generatedId));
            }
        }

        return Map.of(
                "message", "Tournament created successfully",
                "tournamentId", generatedId);
    }

    public Map<String, Object> getTournamentById(String id) throws Exception {
       // Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("tournaments").document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new Exception("Tournament not found with ID: " + id);
        }

        return snapshot.getData(); // Return raw data as Map<String, Object>
    }

    public List<Map<String, Object>> getTournamentParticipants(String tournamentId) throws Exception {
      //  Firestore db = FirestoreClient.getFirestore();
        CollectionReference participantsRef = db.collection("tournaments")
                .document(tournamentId)
                .collection("participants");

        List<Map<String, Object>> participants = new ArrayList<>();
        for (DocumentSnapshot doc : participantsRef.get().get().getDocuments()) {
            participants.add(doc.getData());
        }

        return participants;
    }

    // the same
    public List<ParticipantResponse> getParticipantsByTournament(String tournamentId) throws Exception {
      //  Firestore db = FirestoreClient.getFirestore();

        CollectionReference participantsRef = db.collection("tournaments")
                .document(tournamentId)
                .collection("participants");

        ApiFuture<QuerySnapshot> querySnapshot = participantsRef.get();
        List<ParticipantResponse> result = new ArrayList<>();

        for (DocumentSnapshot doc : querySnapshot.get().getDocuments()) {
            String userId = doc.getString("userId");
            Long points = doc.getLong("points");
            Timestamp joinedAtTs = doc.getTimestamp("joinedAt");

            // ✅ Convert to java.time.Instant using .toDate().toInstant()
            Instant joinedAt = joinedAtTs != null ? joinedAtTs.toDate().toInstant() : null;

            result.add(new ParticipantResponse(
                    userId,
                    points != null ? points.intValue() : 0,
                    joinedAt));
        }
        return result;
    }

    public List<JoinRequestDTO> getJoinRequests(String tournamentId) throws Exception {
      //  Firestore db = FirestoreClient.getFirestore();

        CollectionReference requestsRef = db.collection("tournaments")
                .document(tournamentId)
                .collection("pendingRequests");

        List<JoinRequestDTO> response = new ArrayList<>();
        List<QueryDocumentSnapshot> docs = requestsRef.get().get().getDocuments();

        for (DocumentSnapshot doc : docs) {
            JoinTournamentRequestDTO req = doc.toObject(JoinTournamentRequestDTO.class);

            if (req == null || req.getUid() == null || req.getUid().trim().isEmpty()) {
                System.err.println("⚠️ Skipping invalid join request in document: " + doc.getId());
                continue;
            }

            DocumentSnapshot userDoc = db.collection("users").document(req.getUid()).get().get();
            if (userDoc.exists()) {
                JoinRequestDTO dto = new JoinRequestDTO();
                dto.setUid(req.getUid());
                dto.setUsername(userDoc.getString("username"));
                dto.setEmail(userDoc.getString("email"));
                response.add(dto);
            }
        }

        return response;
    }

    public List<TournamentRequest> searchTournamentsByName(String name) throws Exception {
      //  Firestore db = FirestoreClient.getFirestore();
        CollectionReference tournamentsRef = db.collection("tournaments");

        Query query = tournamentsRef
                .whereGreaterThanOrEqualTo("name", name)
                .whereLessThanOrEqualTo("name", name + "\uf8ff");

        List<QueryDocumentSnapshot> docs = query.get().get().getDocuments();
        List<TournamentRequest> result = new ArrayList<>();

        for (QueryDocumentSnapshot doc : docs) {
            TournamentRequest tournament = doc.toObject(TournamentRequest.class);
            tournament.setId(doc.getId());

            // Fetch owner info from "users" collection
            DocumentSnapshot userDoc = db.collection("users").document(tournament.getOwnerId()).get().get();
            if (userDoc.exists()) {
                tournament.setOwnerName(userDoc.getString("username")); // 👈 Add to DTO
            } else {
                tournament.setOwnerName("Unknown");
            }

            result.add(tournament);
        }

        return result;
    }

}
