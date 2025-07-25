package com.futbolapp.back.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchSummaryDTO {
    private String utcDate;
    private String status;
    private String homeTeamName;
    private String homeTeamCrest;
    private String awayTeamName;
    private String awayTeamCrest;
    private String winner;
    private ScoreDetailDTO fullTimeScore;
}
