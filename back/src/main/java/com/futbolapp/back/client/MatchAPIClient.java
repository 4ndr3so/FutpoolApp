package com.futbolapp.back.client;


import com.futbolapp.back.dto.MatchResponseDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class MatchAPIClient {

    private final RestTemplate restTemplate;
    private static final String MATCHES_URL = "http://localhost:3001/matchesSummary";

    public MatchAPIClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MatchResponseDTO fetchMatches() {
        return restTemplate.getForObject(MATCHES_URL, MatchResponseDTO.class);
    }
}
