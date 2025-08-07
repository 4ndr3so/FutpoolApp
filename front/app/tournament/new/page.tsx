

"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MatchPrediction from "@/components/match/MatchPrediction";
import TournamentForm from "@/components/tournament/TournamentForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function TournamentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Tournaments</h2>

      <ProtectedRoute>
        <TournamentForm />
      </ProtectedRoute>
    </div>
  );
}
