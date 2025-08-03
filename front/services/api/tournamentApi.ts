// services/tournamentApi.ts
import { MatchSummary, Participant, TournamentData } from "@/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";

// api/tournament.ts


// 🔹 Create a tournament
export const createTournament = async (tournament: TournamentData): Promise<{ tournamentId: string }> => {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tournament),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Server error");
  }

  return response.json();
};

// 🔹 Fetch tournament by ID
export const fetchTournamentById = async (id: string): Promise<TournamentData> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/get/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tournament");
  return res.json();
};

// 🔹 Fetch match summaries
export const fetchMatchSummary = async (id: string): Promise<MatchSummary[]> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/matches/summary`);

  if (!res.ok) {
    throw new Error(`Failed to fetch match summary for competition ID: ${id}`);
  }

  return res.json(); // Expected to resolve to MatchSummary[]
};



export const fetchTournamentsByParticipantId = async (participantId: string): Promise<TournamentData[]> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/participant/${participantId}`);
  if (!res.ok) throw new Error("Failed to fetch tournaments by participant ID");
  return res.json();
};

export const fetchTournamentsByIds = async (ids: string[]): Promise<TournamentData[]> => {
  const promises = ids.map(async (id) => {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/get/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch tournament ${id}`);
    return res.json();
  });

  return Promise.all(promises);
};

// hooks/fetchScoreboard.ts


export const fetchScoreboard = async (tournamentId: string): Promise<Participant[]> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/${tournamentId}/participants`);
  if (!res.ok) throw new Error("Failed to fetch scoreboard");
  return res.json();
};


// services/api/tournamentApi.ts

export const searchTournamentsByName = async (name: string): Promise<TournamentData[]> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournaments/search?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch tournaments");
  return res.json();
};