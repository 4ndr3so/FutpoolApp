package com.futbolapp.back.service;

import com.futbolapp.back.dto.PredictionDTO;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PredictionService {

    //always inject the firestore client
    private final Firestore db;

    public PredictionService(Firestore db) {
        this.db = db;
    }

    private static final String COLLECTION_NAME = "predictions";

    public List<PredictionDTO> getPredictions(String userId, String tournamentId, String matchId)
            throws ExecutionException, InterruptedException {
        //Firestore db = FirestoreClient.getFirestore();
        CollectionReference predictionsRef = db.collection(COLLECTION_NAME);

        Query query = predictionsRef;

        if (userId != null) {
            query = query.whereEqualTo("userId", userId);
        }
        if (tournamentId != null) {
            query = query.whereEqualTo("tournamentId", tournamentId);
        }
        if (matchId != null) {
            query = query.whereEqualTo("matchId", matchId);
        }

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<PredictionDTO> result = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            PredictionDTO dto = doc.toObject(PredictionDTO.class);
            dto.setId(doc.getId()); // Optional: expose Firestore doc ID
            result.add(dto);
        }

        return result;
    }


    //avoid save predictions if the match is finished, the prediction just can be saved before the match starts
    public String savePrediction(PredictionDTO prediction) throws ExecutionException, InterruptedException {
        //Firestore db = FirestoreClient.getFirestore();

        // ✅ Generate unique document ID
        String docId = prediction.getUserId() + "_" + prediction.getTournamentId() + "_" + prediction.getMatchId();

        // ✅ Set createdAt if not already set
        if (prediction.getCreatedAt() == null) {
            prediction.setCreatedAt(Instant.now());
        }

        // ✅ Save prediction (create or update, no duplicates)
        ApiFuture<WriteResult> future = db.collection("predictions")
                .document(docId)
                .set(prediction, SetOptions.merge());

        return future.get().getUpdateTime().toString();
    }
}
