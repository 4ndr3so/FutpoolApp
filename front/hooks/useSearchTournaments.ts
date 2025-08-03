// hooks/useSearchTournaments.ts
import { useQuery } from "@tanstack/react-query";
import { searchTournamentsByName } from "@/services/api/tournamentApi";

export const useSearchTournaments = (name: string) => {
  return useQuery({
    queryKey: ["searchTournaments", name],
    queryFn: () => searchTournamentsByName(name),
    enabled: name.length > 1, // avoid querying for short/empty terms
  });
};
