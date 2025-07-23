// services/tournamentApi.ts
import { TournamentData } from "@/app/types";

export const createTournament = async (tournament: TournamentData) => {
    const response = await fetch("http://localhost:8080/api/tournaments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tournament),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Server error");
    }

    return response.json();
};
