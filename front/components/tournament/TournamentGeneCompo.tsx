import React from 'react'
import TournamentInfo from './TournamentInfo';

import { TournamentData } from '@/types';
import { useRouter } from 'next/navigation';

type Props = {
  tournaments?: TournamentData[]; // data tournament
  viewTournament?: (tournamentId: string) => void;
}

export default function TournamentGeneCompo({ tournaments, viewTournament }: Props) {
  const router = useRouter();


  return (
    <>
      {tournaments?.map((tournament, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 bg-white shadow-md p-4 rounded-lg mb-6 mx-8"
        >

          <TournamentInfo
            competitionName={tournament.competitionName}
            idCompetition={tournament.idCompetition}
            createdAt={tournament.createdAt}
            tournamentId={tournament.id}
            viewTournament={viewTournament}
          />

          <div className="">
            <p className="text-sm text-gray-600">See</p>
            <p className="text-sm text-gray-600">Who</p>
            <p className="text-sm text-gray-600">is winning!</p>
            <button
              onClick={() => router.push(`/scoreboard/${tournament.id}`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              View Scoreboard
            </button>
          </div>
        </div>
      ))}
    </>
  )
}