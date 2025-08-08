"use client";
import React, { useState } from "react";
import { TournamentData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createTournament } from "@/services/api/tournamentApi";
import { useCompetitions } from "@/hooks/useCompetitions";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TournamentForm: React.FC = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        ownerId: "",
        idCompetition: "", // This will be set based on the selected competition
        competitionName: "", // This will be set based on the selected competition
        pointsPerWin: 3,
        pointsPerDraw: 1,
        pointsPerExactScore: 5,
        allowPodiumPrediction: true,
        participants: "", // This will be a comma-separated string of participant names

    });

    const user = useSelector((state: RootState) => state.user);
    const { data: competitions, isLoading } = useCompetitions(); // ⬅️ fetch competitions

    const mutation = useMutation({
        mutationFn: createTournament,
        onSuccess: () => {
            toast.success("✅ Tournament created!");
            setTimeout(() => {
                router.push("/tournament");
            }, 1500); // short delay to show toast
        },
        onError: (error: unknown) => {
            const message = function getErrorMessage(err: unknown): string {
                if (err && typeof err === "object" && "message" in err) {
                    return (err as { message: string }).message;
                }
                return "An unexpected error occurred.";
            };
            toast.error(message(error));
        },
    });




    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        if (name === "idCompetition" && competitions) {
            const selected = competitions.find(c => c.id.toString() === value);
            console.log(selected?.name, value, selected?.id)
            setForm((prev) => ({
                ...prev,
                // UI-friendly
                idCompetition: selected ? String(selected.id) : "",            // for Firestore
                competitionName: selected ? selected.name : "",       // 🆕 if needed
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.uid) {
            alert("User is not authenticated");
            return;
        }

        const tournament: TournamentData = {
            id: "", // Firestore will auto-generate this
            name: form.name,
            ownerId: user.uid, // ✅ inject from Redux here
            idCompetition: form.idCompetition,
            competitionName: form.competitionName,
            ownerName: user.username, // Optionally set owner name
            rules: {
                pointsPerWin: Number(form.pointsPerWin),
                pointsPerDraw: Number(form.pointsPerDraw),
                pointsPerExactScore: Number(form.pointsPerExactScore),
                allowPodiumPrediction: form.allowPodiumPrediction,
            },
            participants: [user.uid], // Optionally add owner as first participant
            createdAt: Timestamp.fromDate(new Date()),
        };

        mutation.mutate(tournament);
    };

    if (mutation.isPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                <p className="mt-4 text-blue-600 font-medium">Creating tournament...</p>
            </div>
        );
    }


    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Tournament</h2>

                {/* Competition Select Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Competition
                    </label>
                    <select
                        name="idCompetition"
                        value={form.idCompetition}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                        required
                    >
                        <option value="">-- Select --</option>
                        {isLoading ? (
                            <option disabled>Loading...</option>
                        ) : (
                            competitions?.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Tournament Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Champions League 2025"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Points per win
                        </label>
                        <input
                            type="number"
                            name="pointsPerWin"
                            value={form.pointsPerWin}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Points per draw
                        </label>
                        <input
                            type="number"
                            name="pointsPerDraw"
                            value={form.pointsPerDraw}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Points per exact score
                        </label>
                        <input
                            type="number"
                            name="pointsPerExactScore"
                            value={form.pointsPerExactScore}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        name="allowPodiumPrediction"
                        checked={form.allowPodiumPrediction}
                        onChange={handleChange}
                        className="accent-blue-600"
                    />
                    Allow Podium Prediction
                </label>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex justify-center items-center gap-2 transition disabled:opacity-60"
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
        </div>

    );
};

export default TournamentForm;
