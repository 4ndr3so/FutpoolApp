// src/hooks/useEvaluationByTournament.ts
import { useQuery } from "@tanstack/react-query";

import { Prediction } from "@/types";
import { fetchEvaluation } from "@/services/api/fetchEvaluationApi";

export const useEvaluationByTournament = (
  tournamentId: string | null,
  userId: string | null
) => {
  return useQuery<Prediction[]>({
    queryKey: ["evaluation", tournamentId, userId],
    queryFn: () => {
      if (!tournamentId || !userId)
        throw new Error("Tournament ID and User ID are required");
      return fetchEvaluation(tournamentId, userId);
    },
    enabled: !!tournamentId && !!userId, // only run if both IDs exist
  });
};