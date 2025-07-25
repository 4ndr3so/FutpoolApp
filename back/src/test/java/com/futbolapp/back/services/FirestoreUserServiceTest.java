package com.futbolapp.back.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.futbolapp.back.dto.User;
import com.futbolapp.back.repository.UserRepository;
import com.futbolapp.back.service.FirestoreUserService;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

@ExtendWith(MockitoExtension.class)
public class FirestoreUserServiceTest {

    @Mock
    private Firestore firestore;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FirestoreUserService userService;

    @Test
    void testGetUserReturnsUser() throws Exception {
        User mockUser = new User();
        mockUser.setId("user123");
        mockUser.setUsername("testuser");

        DocumentSnapshot snapshot = mock(DocumentSnapshot.class);
        when(snapshot.exists()).thenReturn(true);
        when(snapshot.toObject(User.class)).thenReturn(mockUser);
        when(userRepository.getUser("user123")).thenReturn(snapshot);

        User result = userService.getUser("user123");

        assertEquals("user123", result.getId());
        assertEquals("testuser", result.getUsername());
    }
}
