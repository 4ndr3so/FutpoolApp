package com.futbolapp.back.controller;


import com.futbolapp.back.controllers.UserController;
import com.futbolapp.back.models.User;
import com.futbolapp.back.service.FirestoreUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.concurrent.ExecutionException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FirestoreUserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddUser() throws Exception {
        User user = new User();
        user.setId("user123");
        user.setUsername("testuser");

        when(userService.saveUser(any(User.class))).thenReturn("2025-07-22T12:00:00Z");

        mockMvc.perform(post("/public/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(content().string("2025-07-22T12:00:00Z"));
    }

    @Test
    void testGetUser() throws Exception {
        User user = new User();
        user.setId("user123");
        user.setUsername("testuser");

        when(userService.getUser("user123")).thenReturn(user);

        mockMvc.perform(get("/public/users/user123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("user123"))
                .andExpect(jsonPath("$.username").value("testuser"));
    }

    @Test
    void testDeleteUser() throws Exception {
        when(userService.deleteUser("user123")).thenReturn("User with ID user123 deleted.");

        mockMvc.perform(delete("/public/users/user123"))
                .andExpect(status().isOk())
                .andExpect(content().string("User with ID user123 deleted."));
    }
}
