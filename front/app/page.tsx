"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";



export default function PublicPage() {
const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r shadow-sm p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-6">FutbolApp</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="#">Public Stats</a>
          {user && (
            <>
              <a onClick={() => router.push("/tournament/new")}>Create Tournament</a>
              <a onClick={() => router.push("/tournament/details")}>My Tournaments</a>
            </>
          )}
          {!user && (
            <a onClick={() => router.push("/login")}>Login</a>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Welcome to FutbolApp</h1>
        <p>This is a public stats dashboard. Log in to make predictions and join tournaments.</p>
      </main>
    </div>
  );
}