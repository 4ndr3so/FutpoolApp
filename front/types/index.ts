import { Timestamp } from "firebase/firestore";



export interface User {
    uid: string;
    username: string;
    email: string;
    provider: string;
    tournamentsOwn: string[]; // or fetch from Firestore later
    tournamentsParticipant: string[]; // same
};
export type TournamentData = {
  id: string; // Firestore document ID
  name: string;
  ownerId: string;
  ownerName: string;
  idCompetition: string; // This will be set based on the selected competition
  competitionName: string; // This will be set based on the selected competition
  rules: {
    pointsPerWin: number;
    pointsPerDraw: number;
    pointsPerExactScore: number;
    allowPodiumPrediction: boolean;
  };
  participants: string[];
  createdAt: Timestamp ;
};
export type TeamScoreProps ={
  status: string;
  teamName: string;
  flagUrl: string;
  score: number;
  onChange: (score: number) => void;
};


export type Competition = {
    id: string;
    name: string;
    code: string;
    emblem: string;
};

export type ScoreDetail = {
  home: number;
  away: number;
};

export type MatchSummary = {
  id: string;
  utcDate: string;
  status: string;
  homeTeamName: string;
  homeTeamCrest: string;
  awayTeamName: string;
  awayTeamCrest: string;
  winner: string;
  fullTimeScore: ScoreDetail;
};

export type Prediction = {
  id?: string; // Firestore document ID, optional
  userId: string;
  tournamentId: string;
  idCompetition: string;
  matchId: string;
  homeTeamScore: number;
  awayTeamScore: number;
  pointsAwarded: number;
  evaluated: boolean;
  createdAt: Date | string; // Can be a Firestore Timestamp, ISO string, or Date
};

/* Prediction Interface 
 private String id; // Firestore document ID
    private String idCompetition; 
    private String userId;
    private String tournamentId;
    private String matchId;
    private int homeTeamScore;
    private int awayTeamScore;
    private int pointsAwarded;
    private boolean evaluated;
    private Instant createdAt;
*/
/////change add username and email
export type Participant = {
  userId: string;
  points: number;
  username: string;
  email: string;
  joinedAt: string; // ISO 8601 format from Java's Instant.toString()
};

export interface JoinTournamentRequest {
  uid: string;
  username: string;
  email: string;
  tournamentId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  timestamp: string; // ISO string or Firebase Timestamp
}

export interface JoinRequestDTO {
  uid: string;
  username: string;
  email: string;
}