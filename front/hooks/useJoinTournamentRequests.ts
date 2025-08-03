// hooks/useJoinTournamentRequests.ts
import { apiFetchJoinRequests } from "@/services/api/apiFetchJoinRequests";
import { acceptJoinRequest, fetchJoinRequests, rejectJoinRequest } from "@/services/api/joinTournamentApi";
import { JoinRequestDTO } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useJoinTournamentRequests = (tournamentId: string) => {
  return useQuery({
    queryKey: ["joinRequests", tournamentId],
    queryFn: () => fetchJoinRequests(tournamentId),
    enabled: !!tournamentId,
  });
};

export const useAcceptJoinRequest = (tournamentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => acceptJoinRequest(tournamentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joinRequests", tournamentId] });
    },
  });
};

export const useRejectJoinRequest = (tournamentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => rejectJoinRequest(tournamentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joinRequests", tournamentId] });
    },
  });
};



export const useJoinRequests = (tournamentId: string) => {
  return useQuery<JoinRequestDTO[]>({
    queryKey: ["joinRequests", tournamentId],
    queryFn: () => apiFetchJoinRequests(tournamentId),
    enabled: !!tournamentId,
  });
};