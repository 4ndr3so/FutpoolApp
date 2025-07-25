import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TournamentData } from "@/app/types";

type TournamentState = TournamentData[];

const initialState: TournamentState = [];

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments: (_state, action: PayloadAction<TournamentData[]>) => action.payload,
    clearTournaments: () => [],
  },
});

export const { setTournaments, clearTournaments } = tournamentSlice.actions;
export default tournamentSlice.reducer;