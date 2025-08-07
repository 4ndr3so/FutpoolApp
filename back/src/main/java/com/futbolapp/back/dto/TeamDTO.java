package com.futbolapp.back.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamDTO {
    private int id;
    private String name;
    private String tla;
    private String crest;
    private int leagueRank;
    private String formation;
}
