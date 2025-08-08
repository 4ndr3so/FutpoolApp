package com.futbolapp.back.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.futbolapp.back.controllers.CompetitionController;
import com.futbolapp.back.dto.Competition;
import com.futbolapp.back.service.CompetitionService;

@WebMvcTest(CompetitionController.class)
@AutoConfigureMockMvc(addFilters = false) // disables Spring Security for the test
public class CompetitionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompetitionService competitionService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetFilteredCompetitions_returnsExpectedData() throws Exception {
        Competition competition = new Competition();
        competition.setId(2011);
        competition.setName("DFB-Pokal");

        List<Competition> competitions = List.of(competition);

        when(competitionService.getActiveCompetitions()).thenReturn(competitions);

        
    }
}
