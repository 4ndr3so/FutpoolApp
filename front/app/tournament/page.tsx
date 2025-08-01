"use client";

import WelcomComp from "@/components/general/WelcomComp";
import TournamentGeneCompo from "@/components/tournament/TournamentGeneCompo";

import { useAuth } from "@/context/AuthContext";
import { useTournamentsByIds } from "@/hooks/useTournamentsByIds";
import { useUserById } from "@/hooks/useUser";

import { RootState } from "@/store";
import { setTournaments } from "@/store/slices/tournamentSlice";
import { setUser } from "@/store/slices/userSlice";
import { setTournamentSelected } from "@/store/slices/tournamentSelectedSlice";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomePageAfterLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user: firebaseUser, loading } = useAuth();
  const user = useSelector((state: RootState) => state.user);

  // 👇 Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  const { data: userProfile, isLoading: userLoading } = useUserById(user?.uid || "");
  const tournamentIds = userProfile?.tournamentsParticipant || [];
  const { data: tournaments, isLoading: loadingTournaments } = useTournamentsByIds(tournamentIds);

  // 👇 Update Redux user store when profile is fetched
  useEffect(() => {
    if (userProfile) {
      dispatch(setUser({ ...userProfile }));
    }
  }, [userProfile]);

  // 👇 Store tournaments in Redux
  useEffect(() => {
    if (tournaments) {
      dispatch(setTournaments(tournaments));
    }
  }, [tournaments]);

  const handleCreateTournament = () => {
    router.push("/tournament/new");
  };

  const viewTournament = (tournamentId: string) => {
    const selectedTournament = tournaments?.find(t => t.id === tournamentId);
    if (!selectedTournament) return console.error("Tournament not found:", tournamentId);
    dispatch(setTournamentSelected(selectedTournament));
    router.push(`/tournament/details/`);
  };

  if (loading || !user) return <div>Loading...</div>;

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
        {/* Header */}
        {userLoading ? (
          <p>Loading user information...</p>
        ) : (
          <WelcomComp
            name={user?.username || "Guest"}
            email={user?.email || "Not signed in"}
            avatarUrl={firebaseUser?.photoURL || "https://i.pravatar.cc/40"}
          />
        )}

        {/* Tournament List */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Tournament Participation</h2>
          {loadingTournaments ? (
            <p>Loading tournaments...</p>
          ) : (
            <TournamentGeneCompo tournaments={tournaments || []} viewTournament={viewTournament} />
          )}
        </section>

        {/* Actions */}
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
