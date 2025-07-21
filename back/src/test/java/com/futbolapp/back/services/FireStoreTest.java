package com.futbolapp.back.services;



import com.futbolapp.back.models.User;
import com.futbolapp.back.service.FirestoreUserService;
import com.futbolapp.back.testutils.FirestoreClientOverride;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FirestoreUserServiceTest {

    @InjectMocks
    private FirestoreUserService firestoreUserService;

    @Mock
    private Firestore firestore;

    @Mock
    private DocumentReference docRef;

    @Mock
    private ApiFuture<DocumentSnapshot> apiFuture;

    @Mock
    private DocumentSnapshot snapshot;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Inject mocked Firestore
        FirestoreClientOverride.setMockInstance(firestore);
    }

    @Test
    void getUser_returnsUser() throws Exception {
        String userId = "test123";
        User mockUser = new User();
        mockUser.setId(userId);
        mockUser.setEmail("test@example.com");

        when(firestore.collection("users")).thenReturn(mock(CollectionReference.class));
        when(firestore.collection("users").document(userId)).thenReturn(docRef);
        when(docRef.get()).thenReturn(apiFuture);
        when(apiFuture.get()).thenReturn(snapshot);
        when(snapshot.exists()).thenReturn(true);
        when(snapshot.toObject(User.class)).thenReturn(mockUser);

        User user = firestoreUserService.getUser(userId);

        assertNotNull(user);
        assertEquals("test123", user.getId());
        assertEquals("test@example.com", user.getEmail());
    }
}
