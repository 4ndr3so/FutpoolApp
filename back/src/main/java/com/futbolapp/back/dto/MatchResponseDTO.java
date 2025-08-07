package com.futbolapp.back.dto;

import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MatchResponseDTO {
    private List<MatchDTO> matches;
}
