package com.futbolapp.back.service;




import com.futbolapp.back.dto.User;
import com.futbolapp.back.repository.UserRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
@Service
public class FirestoreUserService {

    private final Firestore firestore;
    private final UserRepository userRepository;

    public FirestoreUserService(Firestore firestore, UserRepository userRepository) {
        this.firestore = firestore;
        this.userRepository = userRepository;
    }

    private static final String COLLECTION_NAME = "users";

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = firestore.collection(COLLECTION_NAME)
                                                  .document(user.getId())
                                                  .set(user);
        return future.get().getUpdateTime().toString();
    }

    public User getUser(String id) throws ExecutionException, InterruptedException {
        DocumentSnapshot doc = userRepository.getUser(id);
        return doc.exists() ? doc.toObject(User.class) : null;
    }

    public String deleteUser(String id) throws ExecutionException, InterruptedException {
        userRepository.deleteUser(id);
        return "User with ID " + id + " deleted.";
    }
}

