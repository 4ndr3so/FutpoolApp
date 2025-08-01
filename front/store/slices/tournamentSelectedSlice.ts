import { TournamentData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TournamentSelectedState = TournamentData | null;

const initialState: TournamentSelectedState = null as TournamentData | null;


const tournamentSelectedSlice = createSlice({
  name: "tournamentSelected",
  initialState,
  reducers: {
    setTournamentSelected: (state, action: PayloadAction<TournamentData>): TournamentSelectedState => {
      return action.payload;
    },
    clearTournamentSelected: (): TournamentSelectedState => {
      return null;
    },
  },
});

export const { setTournamentSelected, clearTournamentSelected } = tournamentSelectedSlice.actions;
export default tournamentSelectedSlice.reducer;
