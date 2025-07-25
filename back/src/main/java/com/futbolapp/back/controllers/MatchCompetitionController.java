package com.futbolapp.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.futbolapp.back.dto.MatchDTO;
import com.futbolapp.back.dto.MatchSummaryDTO;
import com.futbolapp.back.service.MatchService;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchCompetitionController {

    @Autowired
    private MatchService matchService;

    @GetMapping
    public List<MatchDTO> getAllMatches() {
        return matchService.getAllMatches();
    }

    @GetMapping("/summary")
    public List<MatchSummaryDTO> getMatchSummaries() {
        return matchService.getMatchSummaries();
    }

    @GetMapping("/finished")
    public List<MatchDTO> getFinishedMatches() {
        return matchService.getFinishedMatches();
    }

    @GetMapping("/venue")
    public List<MatchDTO> getMatchesByVenue(@RequestParam String venue) {
        return matchService.getMatchesByVenue(venue);
    }

    @GetMapping("/team")
    public List<MatchDTO> getMatchesByTeam(@RequestParam String name) {
        return matchService.getMatchesByTeam(name);
    }
}
