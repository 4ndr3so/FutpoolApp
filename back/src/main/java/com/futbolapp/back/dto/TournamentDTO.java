package com.futbolapp.back.dto;



import java.util.List;
import java.util.Map;

public class TournamentDTO {
    private String id;
    private String name;
    private String ownerId;
    private Map<String, Object> rules;
    private List<String> participants;

    // ✅ Constructors
    public TournamentDTO() {}

    public TournamentDTO(String id, String name, String ownerId, Map<String, Object> rules, List<String> participants) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.rules = rules;
        this.participants = participants;
    }

    // ✅ Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public Map<String, Object> getRules() {
        return rules;
    }

    public void setRules(Map<String, Object> rules) {
        this.rules = rules;
    }

    public List<String> getParticipants() {
        return participants;
    }

    public void setParticipants(List<String> participants) {
        this.participants = participants;
    }

}
