import { useQuery,useQueryClient } from "@tanstack/react-query";

import { MatchSummary } from "@/types";
import { fetchMatchSummary } from "@/services/api/tournamentApi";


const MATCH_CACHE_KEY = "match_cache";

export const useMatchSummary = (id: string) => {
  const queryClient = useQueryClient();

  const localCache = typeof window !== "undefined" ? localStorage.getItem(MATCH_CACHE_KEY) : null;

  let initialData: MatchSummary[] | undefined = undefined;
  let shouldFetch = !!id;

  if (localCache) {
    try {
      const { data, timestamp, id: cachedId } = JSON.parse(localCache);
      const expired = Date.now() - timestamp > 20 * 60 * 1000;

      if (!expired && cachedId === id) {
        initialData = data;
        shouldFetch = false;
        // optionally hydrate into React Query cache:
        queryClient.setQueryData(["match-summary", id], data);
      }
    } catch (e) {
      console.error("Failed to parse local match cache", e);
    }
  }

  return useQuery<MatchSummary[]>({
    queryKey: ["match-summary", id],
    queryFn: async () => {
      const data = await fetchMatchSummary(id);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          MATCH_CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now(), id })
        );
      }
      return data;
    },
    enabled: shouldFetch,
    initialData,
    staleTime: 1000 * 60 * 20, // valid for 20 min
  });
};
