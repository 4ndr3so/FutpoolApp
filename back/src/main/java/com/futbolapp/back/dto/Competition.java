package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class Competition {
    private int id;
    private String name;
    private String code;
    private String type;
    private String emblem;
    private Area area;
    private Season currentSeason;
}
