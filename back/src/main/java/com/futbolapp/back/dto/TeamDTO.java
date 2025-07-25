package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class TeamDTO {
    private int id;
    private String name;
    private String tla;
    private String crest;
    private int leagueRank;
    private String formation;
}
