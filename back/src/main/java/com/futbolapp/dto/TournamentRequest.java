package com.futbolapp.dto;


import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class TournamentRequest {
    private String id;
    private String name;
    private String ownerId;
    private Map<String, Object> rules;
    private List<String> participants;

}
