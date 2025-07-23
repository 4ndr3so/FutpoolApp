package com.futbolapp.back.client;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.futbolapp.back.dto.CompetitionResponse;

@Component
public class CompetitionClient {

    private final RestTemplate restTemplate;

    public CompetitionClient(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public CompetitionResponse getAllCompetitions() {
        return restTemplate.getForObject("http://localhost:3001/competitions", CompetitionResponse.class);
    }
}
