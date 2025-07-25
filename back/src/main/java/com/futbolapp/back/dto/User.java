package com.futbolapp.back.dto;
import java.util.List;

import lombok.Data;

@Data
public class User {
    private String id;
    private String email;
    private String username;
    private String provider;
    private List<String> tournamentsOwn;
    private List<String> tournamentsParticipant;
}
