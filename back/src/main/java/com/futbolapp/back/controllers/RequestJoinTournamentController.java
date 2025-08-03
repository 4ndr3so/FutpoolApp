package com.futbolapp.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.futbolapp.back.dto.JoinRequestDTO;
import com.futbolapp.back.dto.TournamentDTO;
import com.futbolapp.back.dto.TournamentRequest;
import com.futbolapp.back.service.RequestJoinTournamentService;
import com.futbolapp.back.service.TournamentService;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/tournaments")
public class RequestJoinTournamentController {

    @Autowired
    private RequestJoinTournamentService service;

    @Autowired
    private TournamentService tournamentService;

    @PostMapping("/{tournamentId}/request")
    public void requestToJoin(@PathVariable String tournamentId, @RequestBody JoinRequestDTO request)
            throws ExecutionException, InterruptedException {
        service.requestToJoin(tournamentId, request);
    }

    @PostMapping("/{tournamentId}/accept/{userId}")
    public void acceptRequest(@PathVariable String tournamentId, @PathVariable String userId)
            throws ExecutionException, InterruptedException {
        service.acceptRequest(tournamentId, userId);
    }

    @DeleteMapping("/{tournamentId}/reject/{userId}")
    public void rejectRequest(@PathVariable String tournamentId, @PathVariable String userId) {
        service.rejectRequest(tournamentId, userId);
    }

    @GetMapping("/{tournamentId}/join-requests")
    public List<JoinRequestDTO> getJoinRequests(@PathVariable String tournamentId) throws Exception {
        if (tournamentId == null || tournamentId.trim().isEmpty()) {
            throw new IllegalArgumentException("Tournament ID is required");
        }

        return tournamentService.getJoinRequests(tournamentId);
    }

    @GetMapping("/search")
    public List<TournamentRequest> searchTournamentsByName(@RequestParam String name) throws Exception {
        return tournamentService.searchTournamentsByName(name);
    }
}
