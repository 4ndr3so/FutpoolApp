// store/slices/userSlice.ts
import { User } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: () => null,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;