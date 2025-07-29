"use client";

import React, { useState } from "react";
import MatchPrediction from "@/components/match/MatchPrediction";
import { useMatchSummary } from "@/hooks/useMatchSum";
import PointsPerMatch from "@/components/tournament/PointsPerMatch";
import { useSavePrediction } from "@/hooks/useSavePrediction";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MatchSummary } from "@/app/types";

const MatchDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const selectedTournament = useSelector((state: RootState) => state.tournamentSelected);
  const idCompetition = "w0OkZslXLw3ZXr85sGAQ";

  const { data, isLoading, error } = useMatchSummary(idCompetition); // fallback optional


  const { mutate: savePrediction, isPending: isSaving } = useSavePrediction();

  const [userPredictions, setUserPredictions] = useState<
    Record<string, { home: number; away: number }>
  >({});

  const handlePredictionChange = (matchId: string, prediction: { home: number; away: number }) => {
    setUserPredictions((prev) => ({
      ...prev,
      [matchId]: prediction,
    }));
  };



  const handlePredictionSave = (match: MatchSummary) => {
    const userScore = userPredictions[match.id];
    console.log("Saving prediction for match:", userScore, user?.uid, selectedTournament?.id);


    // if (!userScore || !user?.uid || !selectedTournament?.id || !selectedTournament.idCompetition) return;
    if (!userScore  || !user?.uid || !selectedTournament?.id ) return;
    console.log(
      // selectedTournament?.id,
      //  selectedTournament?.idCompetition,
      match.id,
      userScore.home,
      userScore.away);

    savePrediction({
      userId: user?.uid,
      idCompetition: "2011",
      tournamentId: "w0OkZslXLw3ZXr85sGAQ",
      matchId: match.id,
      homeTeamScore: userScore.home,
      awayTeamScore: userScore.away,
    });
  };

  const buttonClass = classNames(
    "px-4 py-2 rounded font-semibold transition duration-200 text-white",
    {
      "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer": !isSaving,
      "bg-gray-300 text-gray-500 cursor-not-allowed": isSaving,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading match data.</p>;
  if (!data || data.length === 0) return <p>No matches found.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4"> {`Tournament: ${selectedTournament?.name || "Unknown"}`}</h2>
      {data.map((match) => {
        const userScore = userPredictions[match.id] || { home: 0, away: 0 };

        return (
          <div
            key={`container-${match.id}`}
            className="grid grid-cols-[4fr_1fr_1fr] gap-4 items-center"
          >
            <MatchPrediction
              matchSummary={match}
              onUserPredictionChange={(matchId, score) =>
                handlePredictionChange(matchId, score)
              }
            />

            <PointsPerMatch
              predictionScore={userScore}
              realScore={{
                home: match.fullTimeScore.home,
                away: match.fullTimeScore.away,
              }}
              points={3}
            />
            {match.status !== "FINISHED" && (
              <button
                className={buttonClass}
                onClick={() => handlePredictionSave(match)}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Prediction"}
              </button>
            )}
          </div>
        );
      })}
    </div>

  );
};

export default MatchDetails;
