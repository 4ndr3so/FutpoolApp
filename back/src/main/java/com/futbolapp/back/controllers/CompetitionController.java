package com.futbolapp.back.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futbolapp.back.dto.Competition;
import com.futbolapp.back.service.CompetitionService;

@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/active")
    public List<Competition> getFilteredCompetitions() {
        return competitionService.getActiveCompetitions();
    }
}
