package com.futbolapp.back.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

@Configuration
public class FirestoreConfig {

    @Bean
    public Firestore firestore() {
        try {
            InputStream serviceAccount = getClass()
                .getClassLoader()
                .getResourceAsStream("firebase/futbolapp-f50da-firebase-adminsdk-fbsvc-a1ab17138e.json");

            if (serviceAccount == null) {
                throw new IllegalStateException("🔥 Firebase service account file not found in classpath!");
            }

            FirebaseOptions options =  FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            return FirestoreClient.getFirestore();
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize Firestore", e);
        }
    }
}
