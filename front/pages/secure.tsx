// pages/secure.tsx
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function SecurePage() {
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchSecure = async () => {
      if (!token) return;

      const res = await fetch("http://localhost:8080/secure/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.text();
      console.log("Backend response:", data);
    };

    fetchSecure();
  }, [token]);

  if (!user) return <p>🔒 Please log in first</p>;

  return <h1>✅ Secure page for {user.displayName}</h1>;
}
