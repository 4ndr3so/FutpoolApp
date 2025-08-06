import { savePredictionApi } from "@/services/api/fetchPredictionApi";
import { showSuccessToast } from "@/utils/toastUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSavePrediction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: savePredictionApi,
    onSuccess: (_, prediction) => {
      // Optional: Invalidate or update cache
      queryClient.invalidateQueries({ queryKey: ["prediction", prediction.userId, prediction.matchId] });
       showSuccessToast(" Prediction saved!");
    },
  });
};