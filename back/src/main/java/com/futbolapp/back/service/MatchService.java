package com.futbolapp.back.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.futbolapp.back.dto.MatchDTO;
import com.futbolapp.back.dto.MatchSummaryDTO;

@Service
public class MatchService {
    // This class will contain methods related to match operations
    // such as fetching match details, updating scores, etc.
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String MATCHES_URL = "http://localhost:3001/matches";

    public List<MatchDTO> getAllMatches() {
        MatchDTO[] matches = restTemplate.getForObject(MATCHES_URL, MatchDTO[].class);
        return Arrays.asList(matches);
    }

    public List<MatchSummaryDTO> getMatchSummaries() {
        return getAllMatches().stream()
                .map(match -> new MatchSummaryDTO(
                        match.getUtcDate(),
                        match.getStatus(),
                        match.getHomeTeam().getName(),
                        match.getHomeTeam().getCrest(),
                        match.getAwayTeam().getName(),
                        match.getAwayTeam().getCrest(),
                        match.getScore().getWinner(),
                        match.getScore().getFullTime()))
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getFinishedMatches() {
        return getAllMatches().stream()
                .filter(match -> "FINISHED".equals(match.getStatus()))
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getMatchesByVenue(String venue) {
        return getAllMatches().stream()
                .filter(match -> match.getVenue() != null && match.getVenue().equalsIgnoreCase(venue))
                .collect(Collectors.toList());
    }

    public List<MatchDTO> getMatchesByTeam(String teamName) {
        return getAllMatches().stream()
                .filter(match -> match.getHomeTeam().getName().equalsIgnoreCase(teamName) ||
                        match.getAwayTeam().getName().equalsIgnoreCase(teamName))
                .collect(Collectors.toList());
    }
}
