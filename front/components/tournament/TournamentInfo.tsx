import React from 'react'

type Props = {
  competitionName?: string;
  name?: string;
  idCompetition?: string;
  createdAt?: { seconds: number; nanoseconds: number };
  location?: string;
}

export default function TournamentInfo({competitionName, idCompetition, createdAt, location}: Props) {
  return (
    <div>
      <p className="text-sm text-gray-600">Competition Name: {competitionName || "Unknown"}</p>
      <p className="text-sm text-gray-600">ID: {idCompetition || "Unknown"}</p>
      <p className="text-sm text-gray-600">Created At: {createdAt ? new Date(createdAt.seconds * 1000).toLocaleString() : "Unknown"}</p>
      <p className="text-sm text-gray-600">Location: {location || "Unknown"}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Details
      </button>
    </div>
  )
}