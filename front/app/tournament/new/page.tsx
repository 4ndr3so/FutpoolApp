
import MatchPrediction from "@/components/match/MatchPrediction";
import TournamentForm from "@/components/tournament/TournamentForm";


export default function TournamentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tournaments</h1>
      
      <TournamentForm />
    </div>
  );
}
