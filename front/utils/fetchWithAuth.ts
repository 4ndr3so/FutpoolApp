import { auth } from "@/firebase/firebaseClient";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const idToken = await currentUser.getIdToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${idToken}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
};