package com.futbolapp.back.dto;

import lombok.Data;
import java.util.List;

@Data
public class MatchResponseDTO {
    private List<MatchDTO> matches;
}
