package com.futbolapp.back.service;



import com.futbolapp.back.models.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class FirestoreUserService {

     private final Firestore firestore;

    public FirestoreUserService(Firestore firestore) {
        this.firestore = firestore;
    }
    
    private static final String COLLECTION_NAME = "users";

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = firestore.collection(COLLECTION_NAME).document(user.getId()).set(user);
        return future.get().getUpdateTime().toString();
    }

    public User getUser(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot doc = future.get();

        if (doc.exists()) {
            return doc.toObject(User.class);
        } else {
            return null;
        }
    }

    public String deleteUser(String id) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(id).delete();
        return "User with ID " + id + " deleted.";
    }
}
