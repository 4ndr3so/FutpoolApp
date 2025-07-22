"use client";

import { useAuth } from "@/context/AuthContext";
import { loginWithGoogle, logoutUser } from "@/firebase/authHelpers";



export default function LoginPage() {
  const { user } = useAuth();

  const handleLogin = async () => {
    await loginWithGoogle();
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
     
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-6">FutbolApp</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="#" className="text-blue-600 font-semibold">Dashboard</a>
          <a href="#">Tournaments</a>
          <a href="#">My Forecasts</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#" className="mt-auto text-red-500">Log out</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* User Info Header */}
        <header className="flex justify-between items-center bg-white p-4 rounded shadow">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Juan</h1>
            <p className="text-sm text-gray-500">Signed in as juan@example.com</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Tournament Summary */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Tournament Overview</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tournament:</p>
              <p className="text-xl font-bold">World Cup 2026</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Your Points:</p>
              <p className="text-xl font-bold text-blue-600">132</p>
            </div>
          </div>
        </section>

        {/* Tournament Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-md font-semibold mb-2">Create Tournament</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + New Tournament
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-md font-semibold mb-2">Search Tournament</h3>
            <input
              type="text"
              placeholder="Search by code or name..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
        </section>
      </main>
    </div>
  
  );
}