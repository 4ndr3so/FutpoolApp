package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class TournamentRulesDTO {
    private int pointsPerExactScore;
    private int pointsPerWin;
    private int pointsPerDraw;
    private boolean allowPodiumPrediction;
}