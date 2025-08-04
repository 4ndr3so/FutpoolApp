package com.futbolapp.back.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ScoreDTO {
    private String winner;
    private ScoreDetailDTO fullTime;
    private ScoreDetailDTO halfTime;
}
