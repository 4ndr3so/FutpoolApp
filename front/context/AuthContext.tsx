// context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";
import { useDispatch } from "react-redux";
import { User as FirebaseUser } from "firebase/auth";
import type { User as AppUser } from "@/types"; // your custom User type
import { setUser as setReduxUser, clearUser } from "../store/slices/userSlice";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const mapFirebaseToAppUser = (firebaseUser: FirebaseUser): AppUser => ({
    uid: firebaseUser.uid,
    username: firebaseUser.displayName || "Anonymous",
    email: firebaseUser.email || "No email",
    provider: firebaseUser.providerData[0]?.providerId || "unknown",
    tournamentsOwn: [],
    tournamentsParticipant: [],
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser: FirebaseUser = JSON.parse(storedUser);
      const appUser = mapFirebaseToAppUser(parsedUser);

      setUser(parsedUser);
      setToken(storedToken);
      dispatch(setReduxUser(appUser));
    }

    // Do NOT set loading here — let onAuthStateChanged decide
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const appUser = mapFirebaseToAppUser(firebaseUser);

        setUser(firebaseUser);
        setToken(idToken);
        dispatch(setReduxUser(appUser));

        sessionStorage.setItem("user", JSON.stringify(firebaseUser));
        sessionStorage.setItem("token", idToken);
      } else {
        setUser(null);
        setToken(null);
        dispatch(clearUser());

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
