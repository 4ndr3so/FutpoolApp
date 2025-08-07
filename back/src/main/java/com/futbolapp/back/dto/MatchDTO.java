package com.futbolapp.back.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
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