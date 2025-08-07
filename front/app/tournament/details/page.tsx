"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { useAuth } from "@/context/AuthContext";
import Pagination from "@/components/general/Pagination";
import PredictionButton from "@/components/tournament/PredictionButton";
import SkeletonTournamentApp from "@/components/skeleton/SkeletonTournamentApp";

const MatchDetails = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const selectedTournament = useSelector((state: RootState) => state.tournamentSelected);

  const isRehydrated = useSelector((state: RootState) => state._persist?.rehydrated);



  const idCompetition = selectedTournament?.id || "";

  const { user: userAuth, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 10;

  const [userPredictions, setUserPredictions] = useState<
    Record<string, { home: number; away: number }>
  >({});


  //  Hooks must be declared unconditionally
  const { data: apiData, isLoading, error } = useMatchSummary(idCompetition);
  const {
    data: predictions,
    isLoading: loadPredic,
    error: errorPrediction,
  } = useEvaluationByTournament(idCompetition, user?.uid || "");
  const { mutate: savePrediction, isPending: isSaving } = useSavePrediction();

  // Redirect logic AFTER hooks
  useEffect(() => {
    if (!loading) {
      if (!userAuth) {
        router.push("/login");
      } else if (!selectedTournament || !user) {
        router.push("/");
      }
    }
  }, [loading, userAuth, selectedTournament, user]);



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

  //just for the alpha show one page
  // const totalPages = Math.ceil(enrichedMatches.length / matchesPerPage);
  const totalPages = 1;

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

  // Guard comes AFTER alll..... hooks
  if (!isRehydrated || loading || !userAuth || !idCompetition || !user) {
    return <div>Loading...</div>;
  }

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

  if (isLoading) {
  return (
    <div className="space-y-6">
      <div className="max-w-full bg-white shadow-md rounded-lg p-4 mb-6 mt-4 px-6 mx-8 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      {[...Array(3)].map((_, idx) => (
        <SkeletonTournamentApp key={idx} />
      ))}
    </div>
  );
}

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

  return (
    <div className="space-y-6">
      <div className="max-w-full bg-white shadow-md rounded-lg p-4 mb-6 mt-4 px-6 mx-8">
        <h2 className="text-2xl font-bold ">
          {`Tournament: ${selectedTournament?.name || "Unknown"}`}
        </h2>
        <p>{`${predictions?.length} predictions made`}</p>
      </div>
      {paginatedMatches.map((match) => {
        const userScore = userPredictions[match.id];
        const prediction = match.userPrediction;

        const homeScore = userScore?.home ?? match.userPrediction?.homeTeamScore ?? 0;
        const awayScore = userScore?.away ?? match.userPrediction?.awayTeamScore ?? 0;

        return (
          <div
            key={`container-${match.id}`}
            className="max-w-full bg-white shadow-md rounded-lg p-4 mb-6 px-6 mx-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <MatchPrediction
                matchSummary={match}
                onUserPredictionChange={handlePredictionChange}
                score={{ home: homeScore, away: awayScore }}
              />
              {match.status === "FINISHED" && prediction && (
                <PointsPerMatch
                  predictionScore={{ home: homeScore, away: awayScore }}
                  realScore={{
                    home: match.fullTimeScore.home,
                    away: match.fullTimeScore.away,
                  }}
                  points={prediction?.pointsAwarded ?? 0}
                />
              )}
              <PredictionButton
                isPredictionMade={match.userPrediction !== null}
                matchUtcDate={match.utcDate}
                status={match.status}
                onClick={() => handlePredictionSave(match)}
                disabled={isSaving}
                isSaving={isSaving}
              />
            </div>
          </div>
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MatchDetails;
