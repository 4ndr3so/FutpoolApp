// components/match/PredictionButton.tsx
"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

type PredictionButtonProps = {
    matchUtcDate: string; // ISO string like "2025-08-15T19:00:00Z"
    status: string;
    onClick: () => void;
    disabled: boolean;
    isSaving: boolean;
    isPredictionMade: boolean; // Optional prop to check if prediction already exists
};

export default function PredictionButton({
    isPredictionMade,
    matchUtcDate,
    status,
    onClick,
    disabled,
    isSaving,
}: PredictionButtonProps) {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (status === "FINISHED") return;

        const now = new Date();
        const matchDate = new Date(matchUtcDate);
        const oneHourBefore = new Date(matchDate.getTime() - 60 * 60 * 1000);

        // compare in user's local time (e.g., browser timezone)
        if (now <= oneHourBefore) {
            setShowButton(true);
        }
    }, [matchUtcDate, status]);

    if (!showButton || status === "FINISHED") return null;

    return (
        <button
            className={classNames(
                "px-4 py-2 rounded-lg font-bold transition duration-200 border shadow text-sm sm:text-base md:text-lg cursor-pointer",
                {
                    "bg-black text-white hover:bg-gray-900 active:scale-95": !isPredictionMade && !disabled,
                    "bg-white text-black hover:bg-white/90": isPredictionMade && !disabled,
                    "opacity-50 cursor-not-allowed": disabled,
                }
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {isSaving ? "Saving..." : isPredictionMade ? "Update Prediction" : "Save Prediction"}
        </button>
    );
}
