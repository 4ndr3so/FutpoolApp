package com.futbolapp.back.client;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.futbolapp.back.dto.CompetitionResponse;


@Component
public class CompetitionAPIClient {

    private final RestTemplate restTemplate;

    public CompetitionAPIClient(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public CompetitionResponse getAllCompetitions() {
        return restTemplate.getForObject(
            "http://localhost:3001/competitionSummary",
            CompetitionResponse.class
        );
    }
}
