
package com.futbolapp.back.testutils;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class FirestoreClientOverride {

    private static Firestore mockInstance;

    public static void setMockInstance(Firestore mockFirestore) {
        mockInstance = mockFirestore;
    }

    public static Firestore get() {
        return mockInstance != null ? mockInstance : FirestoreClient.getFirestore();
    }

    public static void clear() {
        mockInstance = null;
    }
}
