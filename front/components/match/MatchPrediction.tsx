"use client";
import { MatchSummary } from "@/app/types";
import TeamScore from "./TeamScore";
type MatchPredictionProps = {
  matchSummary: MatchSummary;
};

export default function MatchPrediction({ matchSummary }: MatchPredictionProps) {
  const {
    utcDate,
    status,
    homeTeamName,
    homeTeamCrest,
    awayTeamName,
    awayTeamCrest,
    fullTimeScore,
  } = matchSummary;

  return (
    <div className="relative bg-gray-100 p-4 rounded space-y-4">
      {/* Status Badge and Date */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded shadow">
        {status} - {utcDate}
      </div>

      <h2 className="text-lg font-bold mb-4 text-center">Predict the Match</h2>

      <div className="flex items-center justify-center space-x-6">
        <TeamScore
          status={status}
          teamName={homeTeamName}
          flagUrl={homeTeamCrest}
          onChange={(score) => console.log(`${homeTeamName} score:`, score)}
        />

        {/* Result Display */}
        {
          status === "FINISHED" && (
            <div className="text-xl font-semibold text-gray-700">
              {fullTimeScore?.home} : {fullTimeScore?.away}
            </div>
          )
        }

        <TeamScore
          status={status}
          teamName={awayTeamName}
          flagUrl={awayTeamCrest}
          onChange={(score) => console.log(`${awayTeamName} score:`, score)}
        />
      </div>
    </div>
  );
}

