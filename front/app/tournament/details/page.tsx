"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import MatchPrediction from "@/components/match/MatchPrediction";
import { useMatchSummary } from "@/hooks/useMatchSum";
import PointsPerMatch from "@/components/tournament/PointsPerMatch";
import { useSavePrediction } from "@/hooks/useSavePrediction";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MatchSummary } from "@/app/types";
import { useEvaluationByTournament } from "@/hooks/useEvaluationByTournament";

const MatchDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const selectedTournament = useSelector((state: RootState) => state.tournamentSelected);
  const idCompetition = "w0OkZslXLw3ZXr85sGAQ";

  const { data, isLoading, error } = useMatchSummary(idCompetition); // fallback optional

  const { data: predictions, isLoading: loadPredic, error: errorPrediction } = useEvaluationByTournament(idCompetition);


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

  //update predictions when data changes
  //print predictions from the dataBase
  const enrichedMatches = useMemo(() => {
    if (!data) return [];

    return data.map((match) => {
      const prediction = predictions?.find((pred) => pred.matchId === match.id);
      return {
        ...match,
        userPrediction: prediction ?? null,
      };
    });
  }, [data, predictions]);


  const handlePredictionSave = (match: MatchSummary) => {
    const userScore = userPredictions[match.id];
    console.log("Saving prediction for match:", userScore, user?.uid, selectedTournament?.id);


    // if (!userScore || !user?.uid || !selectedTournament?.id || !selectedTournament.idCompetition) return;
    if (!userScore || !user?.uid || !selectedTournament?.id || !selectedTournament.idCompetition) return;
    console.log(
      // selectedTournament?.id,
      //  selectedTournament?.idCompetition,
      match.id,
      userScore.home,
      userScore.away);

    savePrediction({
      userId: user?.uid,
      idCompetition: selectedTournament.idCompetition,
      tournamentId: selectedTournament?.id,
      matchId: match.id,
      homeTeamScore: userScore.home,
      awayTeamScore: userScore.away,
    });
  };

  console.log("Enriched Matches:", enrichedMatches);
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
      <p> {`${predictions?.length} predictions made`}</p>
      {enrichedMatches.map((match) => {
        //const userScore = userPredictions[match.id] || { home: 0, away: 0 };

        const isFinished = match.status === "FINISHED";
        const prediction = match.userPrediction;

        const homeScore = isFinished
          ? prediction?.homeTeamScore ?? 0
          : userPredictions[match.id]?.home ?? 0;

        const awayScore = isFinished
          ? prediction?.awayTeamScore ?? 0
          : userPredictions[match.id]?.away ?? 0;

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
              score={{ home: homeScore, away: awayScore }}
            />
            {match.status == "FINISHED" &&
              <PointsPerMatch
                predictionScore={{ home: homeScore, away: awayScore }}
                realScore={{
                  home: match.fullTimeScore.home,
                  away: match.fullTimeScore.away,
                }}
                points={prediction?.pointsAwarded ?? 0}
              />
            }
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
