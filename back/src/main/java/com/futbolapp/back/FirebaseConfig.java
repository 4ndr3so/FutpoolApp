package com.futbolapp.back;


import java.io.FileInputStream;
import java.io.InputStream;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initializeFirebase() {
        // Initialize Firebase configuration here
        // This could include setting up Firebase Admin SDK, etc.
        try {
            // Use a service account
            InputStream serviceAccount = new FileInputStream("src/main/resources/firebase/futbolapp-f50da-firebase-adminsdk-fbsvc-a1ab17138e.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .build();
            FirebaseApp.initializeApp(options);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }
}
