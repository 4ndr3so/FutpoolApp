import { User } from "@/types";

import { useQuery } from "@tanstack/react-query";

import { auth } from "@/firebase/firebaseClient";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

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


  //check if user already exists
  const idToken = await currentUser.getIdToken(); //  Get ID token

  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`, // Add the token here
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to save user to backend");
  }

  return await response.text();
}





export const apiFetchUserById = async (uid: string): Promise<User> => {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${uid}`);
  return await res.json();
};