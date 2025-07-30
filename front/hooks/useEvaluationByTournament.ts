// src/hooks/useEvaluationByTournament.ts
import { useQuery } from "@tanstack/react-query";

import { Prediction } from "@/app/types";
import { fetchEvaluation } from "@/services/api/fetchEvaluationApi";

export const useEvaluationByTournament = (tournamentId: string | null) => {
  return useQuery<Prediction[]>({
    queryKey: ["evaluation", tournamentId],
    queryFn: () => {
      if (!tournamentId) throw new Error("Tournament ID is required");
      return fetchEvaluation(tournamentId);
    },
    enabled: !!tournamentId, // only fetch if tournamentId is provided
  });
};
