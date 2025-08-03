// hooks/useJoinTournament.ts
import { useMutation } from "@tanstack/react-query";
import { sendJoinTournamentRequest } from "@/services/api/joinTournamentApi";
import { JoinTournamentRequest } from "@/types";

export const useJoinTournament = () => {
  return useMutation({
    mutationFn: (request: JoinTournamentRequest) => sendJoinTournamentRequest(request),
  });
};
