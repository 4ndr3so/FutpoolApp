import { User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export async function saveUserToBackend(user: import("firebase/auth").User) {
  const body = {
    id: user.uid,
    username: user.displayName || "Anonymous",
    email: user.email || "",
    provider: user.providerData[0]?.providerId || "unknown",
    tournamentsOwn: [], // or fetch from Firestore later
    tournamentsParticipant: [], // same
    
    
  };
  console.log("Saving user to backend:", body.id);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to save user to backend");
  }

  return await response.text();
}

export const useUserById = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}`);
      
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!userId, // only run if userId is defined
  });
};