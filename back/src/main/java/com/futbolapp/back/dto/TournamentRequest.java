package com.futbolapp.back.dto;


import lombok.Data;
import java.util.List;
import java.util.Map;

import com.google.cloud.firestore.annotation.Exclude;

@Data
public class TournamentRequest {
    private String id;
    private String idCompetition;
    private String competitionName;
    private String name;
    private String ownerId;
     private String ownerName; // 👈 Add this
    private Map<String, Object> rules;
    //private List<String> participants;
    

    // Use @Exclude to prevent serialization of this field
    @Exclude
    private transient List<String> participants;
}
