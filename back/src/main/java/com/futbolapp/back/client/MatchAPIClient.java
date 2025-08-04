package com.futbolapp.back.client;


import com.futbolapp.back.dto.MatchResponseDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component

public class MatchAPIClient {

    private final RestTemplate restTemplate;
    private static final String MATCHES_URL = "https://api.football-data.org/v4/competitions/2021/matches";

    public MatchAPIClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MatchResponseDTO fetchMatches() {
        System.out.println("Fetching matches from API: :( " + MATCHES_URL);
        return restTemplate.getForObject(MATCHES_URL, MatchResponseDTO.class);
    }
}