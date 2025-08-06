// store/index.ts

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tournamentReducer from "./slices/tournamentSlice";
import tournamentSelectedReducer from "./slices/tournamentSelectedSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage by default

const rootReducer = combineReducers({
  user: userReducer,
  tournaments: tournamentReducer,
  tournamentSelected: tournamentSelectedReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tournaments", "tournamentSelected"], // 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Required for redux-persist compatibility
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
