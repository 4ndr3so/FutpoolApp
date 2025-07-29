package com.futbolapp.back.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.futbolapp.back.service.EvaluationService;

import java.util.concurrent.ExecutionException;

// @RestController
// @RequestMapping("/api/prediction")
// @CrossOrigin("*")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @PostMapping("/evaluate/{tournamentId}")
    public String evaluate(@PathVariable String tournamentId) throws ExecutionException, InterruptedException {
        evaluationService.evaluatePredictions(tournamentId);
        return "Predictions evaluated successfully.";
    }
}
