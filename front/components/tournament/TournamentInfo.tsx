import React from 'react'
import { Timestamp } from "firebase/firestore"; // from Firestore SDK

type Props = {
  competitionName?: string;
  name?: string;
  idCompetition?: string;
  createdAt: Timestamp;
  location?: string;
  tournamentId?: string;
  viewTournament?: (id: string) => void;
}

export default function TournamentInfo({ competitionName, idCompetition, createdAt, location, tournamentId, viewTournament }: Props) {

  function fromFirestoreTimestamp(timestampObj: { seconds: number, nanos?: number }): Date {
  return new Date(timestampObj.seconds * 1000); // nanos ignored unless needed
}


  return (
    <div>
      <p className="text-sm text-gray-600">Competition Name: {competitionName || "Unknown"}</p>
      <p className="text-sm text-gray-600">ID: {idCompetition || "Unknown"}</p>
      <p className="text-sm text-gray-600">
        Created At: {fromFirestoreTimestamp(createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">Location: {location || "Unknown"}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => viewTournament?.(tournamentId || "")}>
        View Details
      </button>
    </div>
  )
}