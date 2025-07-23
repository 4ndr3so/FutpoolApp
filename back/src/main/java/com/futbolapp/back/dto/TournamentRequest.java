package com.futbolapp.back.dto;


import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class TournamentRequest {
    private String id;
    private String idCompetition;
    private String competitionName;
    private String name;
    private String ownerId;
    private Map<String, Object> rules;
    private List<String> participants;

}
