// hooks/usePrediction.ts
import { Prediction } from "@/types";
import { fetchPredictionApi } from "@/services/api/fetchPredictionApi";
import { useQuery } from "@tanstack/react-query";


export const usePrediction = (userId: string, matchId?: string) => {
  return useQuery<Prediction[]>({
    queryKey: ["prediction", userId, matchId],
    queryFn: () => fetchPredictionApi(userId, matchId),
    enabled: !!userId, // run only if userId is provided
  });
};
