// lib/api/competitions/fetchActiveCompetitions.ts

import { Competition } from "@/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";


//chage to react query
export const fetchActiveCompetitions = async (): Promise<Competition[]> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/competitions/active`);
  if (!res.ok) {
    throw new Error("Failed to fetch competitions");
  }
  return res.json();
};
