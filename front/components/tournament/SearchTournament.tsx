// components/SearchTournament.tsx
"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSearchTournaments } from "@/hooks/useSearchTournaments";
import { useJoinTournament } from "@/hooks/useJoinTournament";
import { TournamentData, JoinTournamentRequest } from "@/types";
import { showSuccessToast, showErrorToast } from "@/utils/toastUtils";

type Props = {
  names: string[];
};
export default function SearchTournament({ names }: Props) {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [requestedTournaments, setRequestedTournaments] = useState<{ id: string, name: string }[]>([]);

  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, error } = useSearchTournaments(submittedTerm);
  const joinMutation = useJoinTournament();

  const handleSendRequest = (tournamentId: string, tournamentName: string) => {
    if (!user?.uid) {
      showErrorToast("You must be logged in.");
      return;
    }

    const requestPayload: JoinTournamentRequest = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      tournamentId,
      status: "PENDING",
      timestamp: new Date().toISOString(),
    };

    if (!tournamentId || tournamentId.trim() === "") {
      showErrorToast("Tournament ID is missing.");
      return;
    }

    joinMutation.mutate(requestPayload, {
      onSuccess: () => {
        setRequestedTournaments(prev => [...prev, { id: tournamentId, name: tournamentName }]);
      },
      onError: (err: any) => {
        console.error(err);
        showErrorToast("Failed to send join request.");
      },
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(names.includes(searchTerm.trim())) {
      showErrorToast("You are already a participant of this tournament.");
      return;
    }
      
    setSubmittedTerm(searchTerm.trim());
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-sm">
      <h3 className="text-md font-semibold mb-2">Search Tournament</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="Premier1... for testing"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </form>

      {isLoading && <p>Loading tournaments...</p>}
      {error && <p className="text-red-500">Error loading tournaments.</p>}
      {data && data.length === 0 && <p>No tournaments found.</p>}


      <ul className="space-y-4">
        {data?.map((t: TournamentData) => {
          if (requestedTournaments.find(r => r.id === t.id)) return null; // hide already requested
          return (
            <li key={t.id} className="border rounded p-3 shadow">
              <div className="font-semibold text-lg">{t.name}</div>
              <div className="text-sm text-gray-600 mb-1">{t.competitionName}</div>
              <div className="text-sm text-gray-500 mb-2">Owner: {t.ownerName}</div>
              <button
                onClick={() => handleSendRequest(t.id, t.name)}
                disabled={joinMutation.isPending}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-60"
              >
                {joinMutation.isPending ? "Sending..." : "Request to Join"}
              </button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
