// store/index.ts
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tournamentReducer from "./slices/tournamentSlice";
import tournamentSelectedReducer from "./slices/tournamentSelectedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tournaments: tournamentReducer,
    tournamentSelected: tournamentSelectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;