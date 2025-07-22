"use client";
import TeamScore from "./TeamScore";

export default function MatchPrediction() {
  const status = "Finalized"; // Can be "Playing", "Finalized", or "Upcoming"
  const date = "July 22, 2025";
  const argentinaScore = 2;
  const franceScore = 1;

  return (
    <div className="relative bg-gray-100 p-4 rounded space-y-4">
      {/* Status Badge and Date */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded shadow">
        {status} - {date}
      </div>

      <h2 className="text-lg font-bold mb-4 text-center">Predict the Match</h2>

      <div className="flex items-center justify-center space-x-6">
        <TeamScore
          teamName="Argentina"
          flagUrl="/flags/arg.png"
          onChange={(score) => console.log("Argentina score:", score)}
        />

        {/* Result Display */}
        <div className="text-xl font-semibold text-gray-700">
          {argentinaScore} : {franceScore}
        </div>

        <TeamScore
          teamName="France"
          flagUrl="/flags/fra.png"
          onChange={(score) => console.log("France score:", score)}
        />
      </div>
    </div>
  );
}

