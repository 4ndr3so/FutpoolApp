
export type User = {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
};

export type TournamentData = {

  name: string;
  ownerId: string;
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