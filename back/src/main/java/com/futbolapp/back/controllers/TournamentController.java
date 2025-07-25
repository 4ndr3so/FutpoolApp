package com.futbolapp.back.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futbolapp.back.dto.TournamentRequest;
import com.futbolapp.back.service.TournamentService;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/tournament")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createTournament(@RequestBody TournamentRequest request) {
        try {
            Map<String, String> result = tournamentService.createTournament(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to create tournament: " + e.getMessage()));
        }
    }

    @GetMapping("get/{id}")
    public ResponseEntity<?> getTournament(@PathVariable String id) {
        try {
            Map<String, Object> tournament = tournamentService.getTournamentById(id);
            return ResponseEntity.ok(tournament);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

}
