package com.futbolapp.back.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import jakarta.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirestoreConfig {

   @PostConstruct
public void initFirebase() {
  if (FirebaseApp.getApps().isEmpty()) {
    try {
      InputStream serviceAccount;
      String path = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
      if (path != null && !path.isBlank()) {
        serviceAccount = new java.io.FileInputStream(path);
      } else {
        serviceAccount = getClass().getClassLoader()
            .getResourceAsStream("firebase/futbolapp-f50da-firebase-adminsdk-fbsvc-a1ab17138e.json");
      }
      if (serviceAccount == null) throw new IllegalStateException("Firebase service account not found");
      FirebaseOptions options = FirebaseOptions.builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();
      FirebaseApp.initializeApp(options);
    } catch (IOException e) {
      throw new RuntimeException("Failed to initialize Firebase", e);
    }
  }
}

    @Bean
    public Firestore firestore() {
        return FirestoreClient.getFirestore(); // always get from managed instance
    }
}
