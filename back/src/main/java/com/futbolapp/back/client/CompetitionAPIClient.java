package com.futbolapp.back.client;

import java.util.Collections;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.futbolapp.back.dto.Area;
import com.futbolapp.back.dto.Competition;
import com.futbolapp.back.dto.CompetitionDTO;
import com.futbolapp.back.dto.CompetitionResponse;
import com.futbolapp.back.dto.SeasonDTO;


@Component
public class CompetitionAPIClient {

    private final RestTemplate restTemplate;

    public CompetitionAPIClient(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    // public CompetitionResponse getAllCompetitions() {

    //     //modify acordingly with your API endpoint
    //     return restTemplate.getForObject(
    //         "http://localhost:3001/competitionSummary",
    //         CompetitionResponse.class
    //     );
    // }

    //just simulate the response, it cost :(, for now just one competition
    //http://api.football-data.org/v4/competitions/PL
     public CompetitionResponse getAllCompetitions() {

        Area area = new Area();
        area.setId(2072);
        area.setName("England");
        area.setCode("ENG");
        area.setFlag("https://crests.football-data.org/770.svg");

        SeasonDTO currentSeason = new SeasonDTO();
        currentSeason.setId(2403);
        currentSeason.setStartDate("2025-08-15");
        currentSeason.setEndDate("2026-05-24");
        currentSeason.setCurrentMatchday(1);

        Competition pl = new Competition();
        pl.setId(2021);
        pl.setName("Premier League");
        pl.setCode("PL");
        pl.setType("LEAGUE");
        pl.setEmblem("https://crests.football-data.org/PL.png");
        pl.setArea(area);
        pl.setCurrentSeason(currentSeason);

        CompetitionResponse response = new CompetitionResponse();
        response.setCompetitions(Collections.singletonList(pl));

        return response;
    }
}
