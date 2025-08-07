
import React from "react";

export default function SkeletonTournamentApp() {
  return (
    <div className="max-w-full bg-white shadow-md rounded-lg p-4 mb-6 px-6 mx-8 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}