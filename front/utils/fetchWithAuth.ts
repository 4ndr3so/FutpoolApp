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

  try {
    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      console.error(`❌ API Error (${res.status}): ${res.statusText} - ${errorBody}`);
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    // If caller wants JSON, let them call `.json()` explicitly
    return res;
  } catch (error) {
    console.error("🚨 Network or auth error:", error);
    throw error; // Important for React Query or caller to handle
  }
};
