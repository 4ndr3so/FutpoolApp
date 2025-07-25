import React from 'react'
import TournamentInfo from './TournamentInfo';
import { useUser } from '@/hooks/useUser';

type Props = {
    tournaments?: any[]; // Replace with actual type if known
}

export default function TournamentGeneCompo({tournaments}: Props) {



  return (
    <div>
      {tournaments?.map((tournament, index) => (
        <TournamentInfo key={index} {...tournament} />
      ))}
    </div>
  )
}