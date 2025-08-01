import { Prediction } from "@/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";


export const fetchEvaluation = async (
  tournamentId: string,
  userId: string
): Promise<Prediction[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/prediction/evaluate/${tournamentId}/user/${userId}`;

  const res = await fetchWithAuth(url, {
    method: "POST", // ✅ POST is allowed with path variables
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch predictions");

  return res.json();
};
