// hooks/useScoreboard.ts
import { fetchScoreboard } from "@/services/api/tournamentApi";
import { useQuery } from "@tanstack/react-query";


export const useScoreboard = (tournamentId: string) => {
  return useQuery({
    queryKey: ["scoreboard", tournamentId],
    queryFn: () => fetchScoreboard(tournamentId),
    enabled: !!tournamentId, // prevent firing if id is undefined
  });
};
