package com.futbolapp.back.dto;



import com.google.cloud.Timestamp;

import lombok.Data;

@Data
public class JoinTournamentRequestDTO {
    private String uid;
    private String username;
    private String email;
    private String status;
    private Timestamp requestedAt; // Use java.util.Date or com.google.cloud.Timestamp if needed
}

