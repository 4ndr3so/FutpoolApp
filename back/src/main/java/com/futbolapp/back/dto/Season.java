package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class Season {
    private int id;
    private String startDate;
    private String endDate;
    private Integer currentMatchday;
    private String winner;
}