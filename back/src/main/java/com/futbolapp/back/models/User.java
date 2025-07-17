package com.futbolapp.back.models;

import java.util.List;

public class User {
    private String id;
    private String email;
    private String username;
    private String provider; // LOCAL, GOOGLE, FACEBOOK
    private List<Sticker> stickersOwned;
    private List<Sticker> stickersNeeded;
    private List<Sticker> stickersToExchange;

    public User() {
        // Required for Firebase deserialization
    }

    public User(String id, String email, String username, String provider,
                List<Sticker> stickersOwned, List<Sticker> stickersNeeded, List<Sticker> stickersToExchange) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.provider = provider;
        this.stickersOwned = stickersOwned;
        this.stickersNeeded = stickersNeeded;
        this.stickersToExchange = stickersToExchange;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public List<Sticker> getStickersOwned() { return stickersOwned; }
    public void setStickersOwned(List<Sticker> stickersOwned) { this.stickersOwned = stickersOwned; }

    public List<Sticker> getStickersNeeded() { return stickersNeeded; }
    public void setStickersNeeded(List<Sticker> stickersNeeded) { this.stickersNeeded = stickersNeeded; }

    public List<Sticker> getStickersToExchange() { return stickersToExchange; }
    public void setStickersToExchange(List<Sticker> stickersToExchange) { this.stickersToExchange = stickersToExchange; }
}
