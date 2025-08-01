// components/TeamScore.tsx
"use client";

import { TeamScoreProps } from "@/types";
import classNames from "classnames";

export default function TeamScore({
  status,
  teamName,
  flagUrl,
  score,
  onChange,
}: TeamScoreProps) {
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value) || 0;
    onChange(newScore);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-sm p-3 bg-white border rounded shadow">
      <div className="flex items-center space-x-3">
        <img src={flagUrl} alt={teamName} className="w-8 h-6 object-cover rounded" />
        <span className="font-semibold">{teamName}</span>
      </div>
      <input
        disabled={status === "FINISHED"}
        type="number"
        min="0"
        value={score}
        onChange={handleScoreChange}
        className="w-16 text-center border px-2 py-1 rounded focus:outline-none"
      />
    </div>
  );
}


