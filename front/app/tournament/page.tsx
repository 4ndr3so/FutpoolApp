"use client";

import WelcomComp from "@/components/general/WelcomComp";
import TournamentGeneCompo from "@/components/tournament/TournamentGeneCompo";
import JoinRequestManager from "@/components/tournament/JoinRequestManager";
import SearchTournament from "@/components/tournament/SearchTournament";

import { useAuth } from "@/context/AuthContext";
import { useTournamentsByIds } from "@/hooks/useTournamentsByIds";
import { useUserById } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";

import { RootState } from "@/store";
import { setTournaments } from "@/store/slices/tournamentSlice";
import { setUser } from "@/store/slices/userSlice";
import { setTournamentSelected } from "@/store/slices/tournamentSelectedSlice";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomePageAfterLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  

  const { user: firebaseUser, loading } = useAuth();
  const user = useSelector((state: RootState) => state.user);

  // Control hydration for SSR safety
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect after hydration if unauthenticated

  const { data: userProfile, isLoading: userLoading, isError, error } = useUserById(user?.uid || "");
  const tournamentIds = userProfile?.tournamentsParticipant || [];
  const { data: tournaments, isLoading: loadingTournaments } = useTournamentsByIds(tournamentIds);

  //autenticated
  useEffect(() => {
    //console.log(error);
    if (isError && isHydrated) {
      router.push(`/?error=${encodeURIComponent("Server unreachable")}`);
    } 
  }, [isError, isHydrated, userLoading, router, error]);

  // Update Redux user profile
  useEffect(() => {
    if (userProfile) {
      dispatch(setUser({ ...userProfile }));
    }
  }, [userProfile, dispatch]);

  // Store tournaments in Redux
  useEffect(() => {
    if (tournaments) {
      dispatch(setTournaments(tournaments));
    }
  }, [tournaments, dispatch]);

  const handleCreateTournament = () => {
    router.push("/tournament/new");
  };
  //return to login if not authenticated
  

  const viewTournament = (tournamentId: string) => {
    const selectedTournament = tournaments?.find(t => t.id === tournamentId);
    if (!selectedTournament) return console.error("Tournament not found:", tournamentId);
    dispatch(setTournamentSelected(selectedTournament));
    router.push(`/tournament/details/`);
  };


  // Prevent rendering until fully hydrated
  if (!isHydrated || loading || userLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
    

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
            <h3 className="text-md font-semibold mb-2">My Tournaments</h3>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleCreateTournament}
            >
              + New Tournament
            </button>
            { 

            }
            <h3 className="text-lg font-bold mt-6">Join Requests</h3>
            {
            tournaments?.map(tournament => (
              <React.Fragment key={tournament.id}>
                {tournament.ownerId === user?.uid && (
                  <JoinRequestManager tournamentId={tournament.id} />
                )}
                
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white p-6 rounded shadow">
            <SearchTournament />
          </div>
        </section>
      </main>
    </div>
  );
}
