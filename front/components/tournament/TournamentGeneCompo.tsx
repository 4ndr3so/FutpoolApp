import React from 'react'
import TournamentInfo from './TournamentInfo';
import { useUser } from '@/hooks/useUser';
import { TournamentData } from '@/app/types';

type Props = {
    tournaments?: TournamentData[]; // data tournament
    viewTournament?: (tournamentId: string) => void;
}

export default function TournamentGeneCompo({tournaments, viewTournament}: Props) {



  return (
    <div>
      {tournaments?.map((tournament, index) => (
        <TournamentInfo key={index}
          competitionName={tournament.competitionName}
          idCompetition={tournament.idCompetition}
          createdAt={tournament.createdAt}
          tournamentId={tournament.id}
          viewTournament={viewTournament}  />
      ))}
    </div>
  )
}