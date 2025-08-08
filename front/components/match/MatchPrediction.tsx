"use client";

import { MatchSummary } from "@/types";
import TeamScore from "./TeamScore";
// import { useState, useEffect } from "react";

type MatchPredictionProps = {
  matchSummary: MatchSummary;
  score: { home: number; away: number };
  onUserPredictionChange: (matchId: string, prediction: { home: number; away: number }) => void;
};

export default function MatchPrediction({
  matchSummary,
  score,
  onUserPredictionChange,
}: MatchPredictionProps) {
  const {
    id,
    utcDate,
    status,
    homeTeamName,
    homeTeamCrest,
    awayTeamName,
    awayTeamCrest,
    fullTimeScore,
  } = matchSummary;

  const handleHomeChange = (value: number) => {
    onUserPredictionChange(id, { home: value, away: score.away });
  };

  const handleAwayChange = (value: number) => {
    onUserPredictionChange(id, { home: score.home, away: value });
  };

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg space-y-4 shadow-md w-full">
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded shadow">
        {status} - {new Date(utcDate).toLocaleDateString()}
      </div>

     

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
        <TeamScore
          status={status}
          teamName={homeTeamName}
          flagUrl={homeTeamCrest}
          score={score.home}
          onChange={handleHomeChange}
        />

        {status === "FINISHED" && (
          <div className="text-lg sm:text-xl font-semibold text-gray-700">
            {fullTimeScore.home} : {fullTimeScore.away}
          </div>
        )}

        <TeamScore
          status={status}
          teamName={awayTeamName}
          flagUrl={awayTeamCrest}
          score={score.away}
          onChange={handleAwayChange}
        />
      </div>
    </div>
  );
}
