package com.futbolapp.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.futbolapp.back.dto.PredictionDTO;
import com.futbolapp.back.service.PredictionService;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/prediction")
@CrossOrigin(origins = "*") // Optional for frontend access
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @GetMapping
    public List<PredictionDTO> getPredictions(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String tournamentId,
            @RequestParam(required = false) String matchId) throws ExecutionException, InterruptedException {
        if (userId == null || userId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }
        return predictionService.getPredictions(userId, tournamentId, matchId);
    }

     @PostMapping
    public String savePrediction(@RequestBody PredictionDTO prediction) throws Exception {
        return predictionService.savePrediction(prediction);
    }
}
