"use client"; // ✅ Make this a Client Component

import { useParams } from "next/navigation";
import Scoreboard from "@/components/tournament/Scoreboard";

export default function ScoreboardPage() {
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          🏆 Tournament Scoreboard
        </h1>
        <Scoreboard tournamentId={tournamentId} />
      </div>
    </main>
  );
}
