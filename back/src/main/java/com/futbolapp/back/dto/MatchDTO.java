package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class MatchDTO {
    private String id;
    private String utcDate;
    private String status;
    private int matchday;
    private String venue;
    private TeamDTO homeTeam;
    private TeamDTO awayTeam;
    private ScoreDTO score;
}