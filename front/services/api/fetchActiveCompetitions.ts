// lib/api/competitions/fetchActiveCompetitions.ts

import { Competition } from "@/app/types";


//chage to react query
export const fetchActiveCompetitions = async (): Promise<Competition[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/competitions/active`);
  if (!res.ok) {
    throw new Error("Failed to fetch competitions");
  }
  return res.json();
};
