package com.futbolapp.back.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.futbolapp.back.client.CompetitionClient;
import com.futbolapp.back.dto.Competition;
import com.futbolapp.back.dto.CompetitionResponse;
import com.futbolapp.back.service.CompetitionService;

@ExtendWith(MockitoExtension.class)
public class CompetitionServiceTest {

    @Mock
    private CompetitionClient competitionClient;

    @InjectMocks
    private CompetitionService competitionService;

    @Test
    void testGetActiveCompetitions_filtersById() {
        // Create mock competitions
        Competition competition1 = new Competition();
        competition1.setId(2011);
        competition1.setName("DFB-Pokal");

        Competition competition2 = new Competition();
        competition2.setId(2021);
        competition2.setName("Premier League");

        // Wrap them in a mock response
        CompetitionResponse response = new CompetitionResponse();
        response.setCompetitions(List.of(competition1, competition2));

        // Tell the mock client what to return
        when(competitionClient.getAllCompetitions()).thenReturn(response);

        // Call the real method
        List<Competition> result = competitionService.getActiveCompetitions();

        // Assertions
        assertEquals(1, result.size());
        assertEquals(2011, result.get(0).getId());
        assertEquals("DFB-Pokal", result.get(0).getName());
    }
}
