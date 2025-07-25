// store/slices/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/app/types";

type UserState = User | null;

const initialState: UserState = null as User | null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return null;
    },
  },
});



export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
