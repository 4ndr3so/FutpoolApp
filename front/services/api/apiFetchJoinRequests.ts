// services/api/joinRequestApi.ts
import { JoinRequestDTO } from "@/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";


export const apiFetchJoinRequests = async (tournamentId: string): Promise<JoinRequestDTO[]> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournaments/${tournamentId}/join-requests`);
  if (!res.ok) throw new Error("Failed to fetch join requests");
  return await res.json();
};
