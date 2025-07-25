package com.futbolapp.back.controller;


import com.futbolapp.back.controllers.UserController;
import com.futbolapp.back.dto.User;
import com.futbolapp.back.service.FirestoreUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.concurrent.ExecutionException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FirestoreUserService userService;

    @Autowired
    private ObjectMapper objectMapper;


 // goal is to verify that: Given a valid user ID
    // The controller correctly calls the service
    // Returns HTTP 200 with the expected JSON
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


}
