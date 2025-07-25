import { useQuery } from "@tanstack/react-query";
import { TournamentData } from "@/app/types";
import { fetchTournamentById } from "@/services/api/tournamentApi";



export const useTournamentsByIds = (ids: string[]) => {
  return useQuery({
    queryKey: ["tournaments", ids],
    queryFn: async () => {
      const tournaments = await Promise.all(ids.map((id) => fetchTournamentById(id)));
      return tournaments;
    },
    enabled: ids.length > 0,
  });
};