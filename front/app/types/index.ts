


export interface User {
    uid: string;
    name: string;
    email: string;
    provider: string;
    tournamentsOwn: string[]; // or fetch from Firestore later
    tournamentsParticipant: string[]; // same
};
export type TournamentData = {

  name: string;
  ownerId: string;
  idCompetition: number; // This will be set based on the selected competition
  competitionName: string; // This will be set based on the selected competition
  rules: {
    pointsPerWin: number;
    pointsPerDraw: number;
    pointsPerExactScore: number;
    allowPodiumPrediction: boolean;
  };
  participants: string[];
  createdAt: Date;
};
export type TeamScoreProps = {
  teamName: string;
  flagUrl: string;
  initialScore?: number;
  onChange?: (score: number) => void;
};

export type Competition = {
    id: number;
    name: string;
    code: string;
    emblem: string;
};