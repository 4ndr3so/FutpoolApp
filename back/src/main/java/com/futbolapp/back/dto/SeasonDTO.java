package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class SeasonDTO {
    private int id;
    private String startDate;
    private String endDate;
    private Integer currentMatchday;
    private String winner;
}