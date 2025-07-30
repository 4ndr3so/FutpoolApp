"use client";
import { MatchSummary } from "@/app/types";
import TeamScore from "./TeamScore";

import { useState, useEffect } from "react";


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

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    onUserPredictionChange(id, { home: homeScore, away: awayScore });
  }, [homeScore, awayScore]);

  return (
    <div className="relative bg-gray-100 p-4 rounded space-y-4">
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded shadow">
        {status} - {utcDate}
      </div>

      <h2 className="text-lg font-bold mb-4 text-center">Predict the Match</h2>

      <div className="flex items-center justify-center space-x-6">
        <TeamScore
          status={status}
          teamName={homeTeamName}
          flagUrl={homeTeamCrest}
          score={score.home}
          onChange={setHomeScore}
        />

        {status === "FINISHED" && (
          <div className="text-xl font-semibold text-gray-700">
            {fullTimeScore.home} : {fullTimeScore.away}
          </div>
        )}

        <TeamScore
          status={status}
          teamName={awayTeamName}
          flagUrl={awayTeamCrest}
          score={score.away}
          onChange={setAwayScore}
        />
      </div>
    </div>
  );
}

