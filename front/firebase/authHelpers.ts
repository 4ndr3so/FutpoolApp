// firebase/authHelpers.ts
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebaseClient";

export async function loginWithGoogle(): Promise<string | null> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}
