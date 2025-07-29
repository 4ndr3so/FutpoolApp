package com.futbolapp.back.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class PredictionDTO {
    private String id; // Firestore document ID
    private String idCompetition; 
    private String userId;
    private String tournamentId;
    private String matchId;
    private int homeTeamScore;
    private int awayTeamScore;
    private int pointsAwarded;
    private boolean evaluated;
    private Instant createdAt;
}
