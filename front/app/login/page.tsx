"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useAuth } from "@/context/AuthContext"; // ✅ make sure this is imported at the top
import { apiFetchUserById, saveUserToBackend } from "@/services/api/userApi";
import { User } from "../../types";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: firebaseUser, loading } = useAuth(); // ✅ use hooks always at the top

  const handleAfterLogin = async (user: import("firebase/auth").User) => {
    let existingUser: User | null = null;

    try {
      existingUser = await apiFetchUserById(user.uid);
    } catch (err) {
      console.warn("User not found, proceeding to create:", err);
    }

    const userData: User = {
      uid: user.uid,
      username: user.displayName || "Anonymous",
      email: user.email || "No email",
      provider: user.providerData[0].providerId,
      tournamentsOwn: existingUser?.tournamentsOwn ?? [],
      tournamentsParticipant: existingUser?.tournamentsParticipant ?? [],
    };

    dispatch(setUser(userData));
    await saveUserToBackend(userData);

    const idToken = await user.getIdToken();
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", idToken);

    router.push("/tournament");
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleAfterLogin(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await handleAfterLogin(result.user);
  };

  if (loading) return <div>Loading...</div>;
  if (firebaseUser) {
    router.push("/tournament");
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleEmailLogin} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <hr />

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
