import { Prediction } from "@/app/types";


export const fetchEvaluation = async (tournamentId: string): Promise<Prediction[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prediction/evaluate/${tournamentId}`;

  const res = await fetch(url, {
    method: "POST", // if your backend uses @PostMapping
  });

  if (!res.ok) {
    throw new Error("Failed to evaluate predictions");
  }

  return res.json();
};
