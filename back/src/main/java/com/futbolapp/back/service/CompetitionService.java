package com.futbolapp.back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.futbolapp.back.client.CompetitionClient;
import com.futbolapp.back.dto.Competition;

@Service
public class CompetitionService {

    private final CompetitionClient competitionClient;

    public CompetitionService(CompetitionClient competitionClient) {
        this.competitionClient = competitionClient;
    }

    public List<Competition> getActiveCompetitions() {
        List<Competition> all = competitionClient.getAllCompetitions().getCompetitions();
        return all.stream()
                  .filter(c -> c.getId() == 2011) //filte just one example
                  .toList();
    }
}
