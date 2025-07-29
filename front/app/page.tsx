"use client";

import WelcomComp from "@/components/general/WelcomComp";
import TournamentGeneCompo from "@/components/tournament/TournamentGeneCompo";

import { useAuth } from "@/context/AuthContext";
import { useTournamentsByIds } from "@/hooks/useTournamentsByIds";
import { useTournamentById } from "@/services/api/tournamentApi";
import { useUserById } from "@/services/api/userApi";

import { RootState } from "@/store";
import { setTournaments } from "@/store/slices/tournamentSlice";
import { setUser } from "@/store/slices/userSlice";
import { setTournamentSelected } from "@/store/slices/tournamentSelectedSlice";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";




export default function LoginPage() {
  const router = useRouter();
  const { user: firebaseUser } = useAuth();
  const user = useSelector((state: RootState) => state.user);


  const dispatch = useDispatch();
  // Fetch user profile data using the user ID from Firebase
  //romve the user id, just for testing purposes
  const { data: userProfile, isLoading: userLoading } = useUserById(user?.uid || "9eJDlLZHSxUoHaF1ggynTq1pbJ93");

  //change the data in redux store when userProfile changes
  useEffect(() => {
    if (userProfile) {
      dispatch(setUser({
        ...userProfile, // merges tournamentsOwn, tournamentsParticipant, etc.
      }));
    }
  }, [userProfile]);
  //fetch the user tournaments



  const tournamentIds = userProfile?.tournamentsOwn || [];
  
  const { data: tournaments, isLoading: loadingTournaments } = useTournamentsByIds(tournamentIds);

  useEffect(() => {
    if (tournaments) {
      dispatch(setTournaments(tournaments));
    }
  }, [tournaments]);

  function handleCreateTournament(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    // For now, just show an alert. Replace with navigation or modal logic as needed.
    router.push("/");
  }

  function viewTournament(tournamentId: string) {

    let selectedTournament = tournaments?.find(t => t.id === tournamentId);
    console.log("Selected Tournament:", selectedTournament);//<------------------------
    if (!selectedTournament) {
      console.error("Tournament not found:", tournamentId);
      return;
    }
    console.log("Selected Tournament ID:", tournamentId);//<------------------------
    dispatch(setTournamentSelected(selectedTournament));
    router.push(`/tournament/details/`);
  }
  return (

    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-6">FutbolApp</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="#" className="text-blue-600 font-semibold">Dashboard</a>
          <a href="#">Tournaments</a>
          <a href="#">My Forecasts</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#" className="mt-auto text-red-500">Log out</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* User Info Header */}
        {userLoading ? (
          <p>Loading user information...</p>
        ) : (
          <WelcomComp
            name={user?.name || "Guest"}
            email={user?.email || "Not signed in"}
            avatarUrl={firebaseUser?.photoURL || "https://i.pravatar.cc/40"}
          />
        )}

        {/* Tournament Summary */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Tournament Overview</h2>
          {
            loadingTournaments ? (
              <p>Loading...</p>
            ) : (
              <TournamentGeneCompo tournaments={tournaments || []} viewTournament={viewTournament} />
            )
          }
        </section>

        {/* Tournament Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-md font-semibold mb-2">Create Tournament</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleCreateTournament}>
              + New Tournament
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-md font-semibold mb-2">Search Tournament</h3>
            <input
              type="text"
              placeholder="Search by code or name..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
        </section>
      </main>
    </div>

  );
}