package com.futbolapp.back.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ParticipantResponse {
    private String userId;
    private int points;
    private Instant joinedAt;
}
 
