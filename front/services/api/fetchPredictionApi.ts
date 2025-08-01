// api/fetchPrediction.ts

import { Prediction } from "@/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";


export const fetchPredictionApi = async (userId: string, matchId?: string): Promise<Prediction[]> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prediction`);

  url.searchParams.append("userId", userId);
  if (matchId) url.searchParams.append("matchId", matchId);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch predictions");
  }

  return res.json();
};
export const savePredictionApi = async (prediction: Omit<Prediction, "id" | "pointsAwarded" | "evaluated" | "createdAt">): Promise<string> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prediction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prediction),
  });

  if (!res.ok) {
    throw new Error("Failed to save prediction");
  }

  return res.text(); // Firestore ID returned from backend
};