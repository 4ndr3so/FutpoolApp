import { useQuery } from "@tanstack/react-query";
import { TournamentData } from "@/types";
import { fetchTournamentById, fetchTournamentsByIds } from "@/services/api/tournamentApi";



// hooks/useTournamentById.ts


export const useTournamentById = (id: string) => {
  return useQuery<TournamentData>({
    queryKey: ["tournament", id],
    queryFn: () => fetchTournamentById(id),
    enabled: !!id, // avoid running if ID is falsy
  });
};


export const useTournamentsByIds = (ids: string[]) => {
  return useQuery({
    queryKey: ["tournamentsByIds", ids],
    queryFn: () => fetchTournamentsByIds(ids),
    enabled: ids.length > 0,
  });
};

