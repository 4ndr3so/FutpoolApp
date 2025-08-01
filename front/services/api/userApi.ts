import { User } from "@/types";

import { useQuery } from "@tanstack/react-query";

import { auth } from "@/firebase/firebaseClient";

export async function saveUserToBackend(user: {
  uid: string;
  username: string;
  email: string;
  provider: string;
  tournamentsOwn?: string[];
  tournamentsParticipant?: string[];
}) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const idToken = await currentUser.getIdToken(); // 🔐 Get ID token

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`, // ✅ Add the token here
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to save user to backend");
  }

  return await response.text();
}





export const apiFetchUserById = async (uid: string): Promise<User> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const idToken = await currentUser.getIdToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${uid}`, {
    headers: {
      "Authorization": `Bearer ${idToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};
