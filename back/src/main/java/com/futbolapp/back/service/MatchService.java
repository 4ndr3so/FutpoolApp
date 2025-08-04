package com.futbolapp.back.service;


import com.futbolapp.back.client.MatchAPIClient;
import com.futbolapp.back.dto.MatchDTO;
import com.futbolapp.back.dto.MatchResponseDTO;
import com.futbolapp.back.dto.MatchSummaryDTO;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final MatchAPIClient matchClient;

    public MatchService(MatchAPIClient matchClient) {
        this.matchClient = matchClient;
    }

    @Cacheable("allMatches")
    public List<MatchDTO> getAllMatches() {
        MatchResponseDTO response = matchClient.fetchMatches();
        return response != null ? response.getMatches() : List.of();
    }

    @Cacheable("matchSummaries")
    public List<MatchSummaryDTO> getMatchSummaries() {
        return getAllMatches().stream()
                .map(match -> new MatchSummaryDTO(
                        match.getId(),
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
