package com.futbolapp.back.dto;

import lombok.Data;

@Data
public class ScoreDTO {
    private String winner;
    private ScoreDetailDTO fullTime;
    private ScoreDetailDTO halfTime;
}
