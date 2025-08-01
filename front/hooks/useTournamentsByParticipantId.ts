// hooks/useTournamentsByParticipantId.ts
import { fetchTournamentsByParticipantId } from "@/services/api/tournamentApi";
import { useQuery } from "@tanstack/react-query";


export const useTournamentsByParticipantId = (participantId: string) => {
  return useQuery({
    queryKey: ["tournamentsParticipant", participantId],
    queryFn: () => fetchTournamentsByParticipantId(participantId),
    enabled: !!participantId,
  });
};
