package com.futbolapp.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.futbolapp.back.dto.PredictionDTO;
import com.futbolapp.back.service.EvaluationService;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/prediction")
@CrossOrigin("*")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @PostMapping("/evaluate/{tournamentId}")
    public List<PredictionDTO> evaluateAndReturn(@PathVariable String tournamentId)
            throws ExecutionException, InterruptedException {
        return evaluationService.evaluateAndReturnPredictions(tournamentId);
    }

}
