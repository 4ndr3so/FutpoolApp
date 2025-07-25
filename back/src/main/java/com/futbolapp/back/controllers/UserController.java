package com.futbolapp.back.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//can use the model or lamblok User class
import com.futbolapp.back.dto.User;
import com.futbolapp.back.service.FirestoreUserService;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.firebase.cloud.FirestoreClient;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private FirestoreUserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> saveUser(@RequestBody User userDto) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Optional: Print for debugging
            System.out.println("Received user: " + userDto.getEmail());

            // Set the document with uid as ID and map the whole object
            db.collection("users")
                    .document(userDto.getId()) // assuming `uid` is the primary user ID
                    .set(userDto, SetOptions.merge());

            return ResponseEntity.ok(Map.of("message", "User saved successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to save user: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
