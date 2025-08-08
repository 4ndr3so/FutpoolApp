// components/TeamScore.tsx
"use client";

import { TeamScoreProps } from "@/types";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export default function TeamScore({
  status,
  teamName,
  flagUrl,
  score,
  onChange,
}: TeamScoreProps) {

  const [animate, setAnimate] = useState(true);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value) || 0;
    setAnimate(false);
    onChange(newScore);

    // remove the animation class after it completes
    setTimeout(() => setAnimate(false), 300); // match duration of animation
  };




  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs p-3 bg-white border rounded shadow sm:max-w-sm">
      <div className="flex flex-col items-center space-y-2">
        <Image
        unoptimized
          width={200}
          height={100}
          src={flagUrl}
          alt={teamName}
          className="w-10 h-7 object-cover rounded shadow"
        />
        <span className="text-base sm:text-lg font-semibold text-center break-words">
          {teamName}
        </span>
      </div>

      <input
        disabled={status === "FINISHED"}
        type="number"
        min="0"
        value={score}
        onChange={handleScoreChange}
        className={classNames(
          "mt-3 w-16 text-center border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-lg transition duration-200",
          {
            "animate-pulse ring-2 ring-gray-400 shadow-md": animate,
          }
        )}
      />
    </div>
  );
}



