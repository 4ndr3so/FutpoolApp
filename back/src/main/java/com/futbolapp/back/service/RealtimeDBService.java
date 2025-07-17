package com.futbolapp.back.service;

import com.google.firebase.database.*;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class RealtimeDBService {

    public void addData() {
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("users");
        ref.child("user1").setValueAsync(Map.of("name", "John", "email", "john@example.com"));
    }
}