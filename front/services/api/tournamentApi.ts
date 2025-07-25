// services/tournamentApi.ts
import { MatchSummary, TournamentData } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
export const createTournament = async (tournament: TournamentData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/create`, {
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

// hooks/useTournamentById.ts
export const fetchTournamentById = async (id: string): Promise<TournamentData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/get/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tournament");
  return res.json();
};

export const useTournamentById = (id: string) => {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tournament/get/${id}`);
      if (!res.ok) throw new Error("Failed to fetch tournament");
      return res.json();
    },
    enabled: !!id, // only fetch if id is defined
  });
};


export const fetchMatchSummary = async (id: string): Promise<MatchSummary[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/matches/summary`);

  if (!res.ok) {
    throw new Error(`Failed to fetch match summary with ID: ${id}`);
  }

  return res.json(); // resolves to MatchSummary[]
};

