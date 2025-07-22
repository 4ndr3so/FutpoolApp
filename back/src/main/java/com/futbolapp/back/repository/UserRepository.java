package com.futbolapp.back.repository;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {

    private final Firestore firestore;

    public UserRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    private static final String COLLECTION_NAME = "users";

    public DocumentSnapshot getUser(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future =
                firestore.collection(COLLECTION_NAME).document(userId).get();

        return future.get();
    }

    public void deleteUser(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future =
                firestore.collection(COLLECTION_NAME).document(userId).delete();
        future.get(); // optional: wait for operation
    }
}
