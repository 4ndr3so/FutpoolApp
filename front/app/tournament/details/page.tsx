"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import MatchPrediction from "@/components/match/MatchPrediction";
import { useMatchSummary } from "@/hooks/useMatchSum";
import PointsPerMatch from "@/components/tournament/PointsPerMatch";
import { useSavePrediction } from "@/hooks/useSavePrediction";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MatchSummary } from "@/types";
import { useEvaluationByTournament } from "@/hooks/useEvaluationByTournament";
import { useRouter } from "next/navigation";
import Scoreboard from "@/components/tournament/Scoreboard";
import { useAuth } from "@/context/AuthContext";
import Pagination from "@/components/general/Pagination";
import PredictionButton from "@/components/tournament/PredictionButton";
const MatchDetails = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const selectedTournament = useSelector((state: RootState) => state.tournamentSelected);
  const idCompetition = selectedTournament?.id || "";

  const { user: userAuth, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 10;

  const [userPredictions, setUserPredictions] = useState<
    Record<string, { home: number; away: number }>
  >({});

  const { data: apiData, isLoading, error } = useMatchSummary(idCompetition);
  const { data: predictions, isLoading: loadPredic, error: errorPrediction } =
    useEvaluationByTournament(idCompetition, user?.uid || "");
  const { mutate: savePrediction, isPending: isSaving } = useSavePrediction();

  // Redirect logic
  useEffect(() => {
    if (!loading) {
      if (!userAuth) {
        router.push("/login");
      } else if (!selectedTournament || !user) {
        router.push("/");
      }
    }
  }, [loading, userAuth, selectedTournament, user]);

  // Guard: wait for auth and required data
  if (loading || !userAuth || !idCompetition || !user) return <div>Loading...</div>;

  // Match + prediction merge
  const enrichedMatches = useMemo(() => {
    if (!apiData) return [];
    return apiData.map((match) => {
      const prediction = predictions?.find((pred) => pred.matchId === match.id);
      return {
        ...match,
        userPrediction: prediction ?? null,
      };
    });
  }, [apiData, predictions]);

  //limit just in this for simulation
  // const totalPages = Math.ceil(enrichedMatches.length / matchesPerPage);
  const totalPages = Math.ceil(1);




  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * matchesPerPage;
    return enrichedMatches.slice(start, start + matchesPerPage);
  }, [enrichedMatches, currentPage]);

  const handlePredictionChange = (matchId: string, prediction: { home: number; away: number }) => {
    setUserPredictions((prev) => ({
      ...prev,
      [matchId]: prediction,
    }));
  };

  const handlePredictionSave = (match: MatchSummary) => {
    const userScore = userPredictions[match.id];
    if (!userScore || !user?.uid || !selectedTournament?.id || !selectedTournament.idCompetition)
      return;

    savePrediction({
      userId: user.uid,
      idCompetition: selectedTournament.idCompetition,
      tournamentId: selectedTournament.id,
      matchId: match.id,
      homeTeamScore: userScore.home,
      awayTeamScore: userScore.away,
    });
  };

  if (isLoading) return <p>Loading match data...</p>;
  if (error || errorPrediction) {
    const errorMessage =
      (error as any)?.message ||
      (errorPrediction as any)?.message ||
      "An unexpected error occurred.";
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded max-w-xl mx-auto text-center">
        <h2 className="font-bold text-lg">Something went wrong 😓</h2>
        <p className="mt-2 text-sm">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!apiData || apiData.length === 0) return <p>No matches found.</p>;


  if (error || errorPrediction) {
    const errorMessage =
      (error as any)?.message ||
      (errorPrediction as any)?.message ||
      "An unexpected error occurred.";

    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded max-w-xl mx-auto text-center">
        <h2 className="font-bold text-lg">Something went wrong 😓</h2>
        <p className="mt-2 text-sm">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }
  
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4"> {`Tournament: ${selectedTournament?.name || "Unknown"}`}</h2>

      <p> {`${predictions?.length} predictions made`}</p>
      {paginatedMatches.map((match) => {
       const userScore = userPredictions[match.id];

        
        const prediction = match.userPrediction;
        const homeScore = userScore?.home ?? match.userPrediction?.homeTeamScore ?? 0;
        const awayScore = userScore?.away ?? match.userPrediction?.awayTeamScore ?? 0;
        return (
          <div
            key={`container-${match.id}`}
            className="grid gap-4 items-center grid-cols-1 sm:grid-cols-[4fr_1fr_1fr]"
          >
            <MatchPrediction
              matchSummary={match}
              onUserPredictionChange={(matchId, score) =>
                handlePredictionChange(matchId, score)
              }
              score={{ home: homeScore, away: awayScore }}
            />
            {match.status == "FINISHED" && prediction &&
              <PointsPerMatch
                predictionScore={{ home: homeScore, away: awayScore }}
                realScore={{
                  home: match.fullTimeScore.home,
                  away: match.fullTimeScore.away,
                }}
                points={prediction?.pointsAwarded ?? 0}
              />
            }
            <PredictionButton
              isPredictionMade={match.userPrediction !== null}
              matchUtcDate={match.utcDate}
              status={match.status}
              onClick={() => handlePredictionSave(match)}
              disabled={isSaving}
              isSaving={isSaving}
            />
          </div>
        );
      })}
      {
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

      }

    </div>

  );
};

export default MatchDetails;
