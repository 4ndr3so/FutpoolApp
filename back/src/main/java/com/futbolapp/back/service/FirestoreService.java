package com.futbolapp.back.service;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class FirestoreService {
    // Always inject the Firestore client
    private final Firestore db;      

    public FirestoreService(Firestore db) {
        this.db = db;
    }

    public void addData() throws Exception {
        DocumentReference docRef = db.collection("users").document("user1");

        Map<String, Object> data = new HashMap<>();
        data.put("name", "John");
        data.put("email", "john@example.com");

        docRef.set(data);
    }

    public String getUser(String userId) throws Exception {
        DocumentSnapshot snapshot = db.collection("users").document(userId).get().get();
        return snapshot.exists() ? snapshot.getData().toString() : "User not found";
    }
}