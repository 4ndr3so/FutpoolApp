package com.futbolapp.back.models;

import java.time.LocalDateTime;

public class Match {
    private String id;
    private String teamHome;
    private String teamAway;
    private LocalDateTime dateTime;
    private String location;
    private int actualHomeGoals;
    private int actualAwayGoals;
}
