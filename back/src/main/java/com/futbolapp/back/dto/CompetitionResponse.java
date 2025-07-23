package com.futbolapp.back.dto;

import java.util.List;

import lombok.Data;

@Data
public class CompetitionResponse {
    private int count;
    private List<Competition> competitions;
}
