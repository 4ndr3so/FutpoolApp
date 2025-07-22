"use client";
import React, { useState } from "react";
import { TournamentData } from "@/app/types";
import { useMutation } from "@tanstack/react-query";

const TournamentForm: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        ownerId: "qW6y6WWtedfX015TfI3F",
        pointsPerWin: 3,
        pointsPerDraw: 1,
        pointsPerExactScore: 5,
        allowPodiumPrediction: true,
        participants: "",
    });

    const createTournament = async (tournament: TournamentData) => {
        const response = await fetch("http://localhost:8080/api/tournaments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tournament),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Server error");
        }

        return response.json();
    };

    const mutation = useMutation({
        mutationFn: createTournament,
        onSuccess: (data) => {
            alert(`✅ Success: ${data.message}`);
        },
        onError: (error: any) => {
            alert(`❌ Error: ${error.message}`);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const tournament: TournamentData = {

            name: form.name,
            ownerId: form.ownerId,
            rules: {
                pointsPerWin: Number(form.pointsPerWin),
                pointsPerDraw: Number(form.pointsPerDraw),
                pointsPerExactScore: Number(form.pointsPerExactScore),
                allowPodiumPrediction: form.allowPodiumPrediction,
            },
            participants: form.participants
                .split(",")
                .map((p) => p.trim())
                .filter((p) => p),
            createdAt: new Date(),
        };

        mutation.mutate(tournament);

    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold">Create Tournament</h2>

            {/* tournament ID  must be automatically generated */}



            <label htmlFor="name">Tournament Name</label>
            <input
                type="text"
                name="name"
                placeholder="Tournament Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            {/* owner ID must be taken for the logged-in user */}

            <div className="grid grid-cols-2 gap-4">
                <label >
                    Points per win
                    <input
                        type="number"
                        name="pointsPerWin"
                        value={form.pointsPerWin}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        placeholder="Points per win"
                    />
                </label>
                <label >
                    Points per draw
                    <input
                        type="number"
                        name="pointsPerDraw"
                        value={form.pointsPerDraw}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        placeholder="Points per draw"
                    />
                </label>
                <label >
                    Points per exact score
                    <input
                        type="number"
                        name="pointsPerExactScore"
                        value={form.pointsPerExactScore}
                        onChange={handleChange}
                        className="border p-2 rounded col-span-2"
                        placeholder="Points per exact score"
                    />
                </label>
            </div>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="allowPodiumPrediction"
                    checked={form.allowPodiumPrediction}
                    onChange={handleChange}
                />
                Allow Podium Prediction
            </label>

            {/* Participants input must be taking from the users that has an account*/}

            <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
                {mutation.isPending ? (
                    <>
                        <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Submitting...
                    </>
                ) : (
                    "Create Tournament"
                )}
            </button>
        </form>
    );
};

export default TournamentForm;
