import React from 'react'
import TournamentInfo from './TournamentInfo';

import { TournamentData } from '@/types';
import { useRouter } from 'next/navigation';

type Props = {
    tournaments?: TournamentData[]; // data tournament
    viewTournament?: (tournamentId: string) => void;
}

export default function TournamentGeneCompo({tournaments, viewTournament}: Props) {
const router = useRouter();


  return (
    <>
  {tournaments?.map((tournament, index) => (
    <div
      key={index}
      className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 bg-white shadow-md p-4 rounded-lg mb-6 mx-8"
    >
      {/* Column 1: Tournament Info */}
      <TournamentInfo
        competitionName={tournament.competitionName}
        idCompetition={tournament.idCompetition}
        createdAt={tournament.createdAt}
        tournamentId={tournament.id}
        viewTournament={viewTournament}
      />

      {/* Column 2: View Scoreboard Button */}
      <div className="flex justify-end sm:justify-center sm:items-center">
        <button
          onClick={() => router.push(`/scoreboard/${tournament.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          View Scoreboard
        </button>
      </div>
    </div>
  ))}
</>
  )
}