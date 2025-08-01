import { useQuery } from "@tanstack/react-query";

import { MatchSummary } from "@/types";
import { fetchMatchSummary } from "@/services/api/tournamentApi";

// ✅ tells TypeScript that this hook returns a list of MatchSummary
export const useMatchSummary = (id: string) => {
  return useQuery<MatchSummary[]>({
    queryKey: ["match-summary", id],
    queryFn: () => fetchMatchSummary(id),
    enabled: !!id,
  });
};

