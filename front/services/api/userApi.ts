import { User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export async function saveUserToBackend(user: {
  uid: string;
  username: string;
  email: string;
  provider: string;
  tournamentsOwn?: string[];
  tournamentsParticipant?: string[];
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to save user to backend");
  }

  return await response.text();
}




export async function apiFetchUserById(userId: string): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}`);
  
  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}
