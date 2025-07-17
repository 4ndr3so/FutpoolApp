package com.futbolapp.back.models;

import java.security.AuthProvider;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class User {
    @Id @GeneratedValue
    private String id;
    private String email;
    private String username;
    private AuthProvider provider; // ENUM: LOCAL, GOOGLE, FACEBOOK
    private List<Sticker> stickersOwned;
    private List<Sticker> stickersNeeded;
    private List<Sticker> stickersToExchange;
}