package com.futbolapp.back.dto;



import lombok.Data;
import java.util.Map;

@Data
public class TournamentDTO {
    private String id;
    private String idCompetition;
    private TournamentRulesDTO rules;
    private Map<String, Integer> participants;
}
