// services/api/joinTournamentApi.ts
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { JoinTournamentRequest } from "@/types"; // Define this type accordingly

export const fetchJoinRequests = async (tournamentId: string): Promise<JoinTournamentRequest[]> => {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournaments/${tournamentId}`);
  if (!response.ok) throw new Error("Failed to fetch join requests");
  return response.json();
};

export const acceptJoinRequest = async (tournamentId: string, userId: string): Promise<void> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournaments/${tournamentId}/accept/${userId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to accept request");
};

export const rejectJoinRequest = async (tournamentId: string, userId: string): Promise<void> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournaments/${tournamentId}/reject/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to reject request");
};

export const sendJoinTournamentRequest = async (request: JoinTournamentRequest): Promise<void> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournaments/${request.tournamentId}/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to send join request: ${errorText}`);
  }
};