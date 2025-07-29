package com.futbolapp.back.dto;
import lombok.Data;

@Data
public class CompetitionDTO {
    private int id;
    private String name;
    private String code;
    private String type;
    private String emblem;
    private String plan;
    private AreaDTO area;
    private SeasonDTO currentSeason;
    private int numberOfAvailableSeasons;
    private String lastUpdated;
}