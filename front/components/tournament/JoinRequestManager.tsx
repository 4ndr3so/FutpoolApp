// components/tournament/JoinRequestManager.tsx
"use client";
// components/JoinRequestManager.tsx
import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { JoinRequestDTO } from "@/types";
import { useJoinRequests } from "@/hooks/useJoinTournamentRequests";
import { acceptJoinRequest, rejectJoinRequest } from "@/services/api/joinTournamentApi";

interface Props {
  tournamentId: string;
}

const JoinRequestManager: React.FC<Props> = ({ tournamentId }) => {
  const queryClient = useQueryClient();
  const { data: requests, isLoading, error } = useJoinRequests(tournamentId);

  const acceptMutation = useMutation({
    mutationFn: (userId: string) => acceptJoinRequest(tournamentId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["joinRequests", tournamentId] }),
  });

  const rejectMutation = useMutation({
    mutationFn: (userId: string) => rejectJoinRequest(tournamentId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["joinRequests", tournamentId] }),
  });

  if (isLoading) return <p>Loading requests...</p>;
  if (error) return <p>Error loading requests</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      
      {requests?.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul className="space-y-3">
          {requests?.map((req: JoinRequestDTO) => (
            <li key={req.uid} className="flex justify-between items-center border p-2 rounded">

              <div>
                <p className="font-semibold">{req.username}</p>
                <p className="text-sm text-gray-500">{req.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => acceptMutation.mutate(req.uid)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => rejectMutation.mutate(req.uid)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinRequestManager;
