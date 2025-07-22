import React, { useState } from "react";
import { TournamentData } from "@/app/types";

const TournamentForm: React.FC = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    ownerId: "",
    pointsPerWin: 3,
    pointsPerDraw: 1,
    pointsPerExactScore: 5,
    allowPodiumPrediction: true,
    participants: "",
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
      id: form.id,
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
      createdAt: new Date(), // Replace with Firebase Timestamp if needed
    };

    console.log("Tournament created:", tournament);
    // You can submit `tournament` to Firebase or your backend here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Create Tournament</h2>

      <input
        type="text"
        name="id"
        placeholder="Tournament ID"
        value={form.id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Tournament Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="ownerId"
        placeholder="Owner Firebase UID"
        value={form.ownerId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="pointsPerWin"
          value={form.pointsPerWin}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Points per win"
        />
        <input
          type="number"
          name="pointsPerDraw"
          value={form.pointsPerDraw}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Points per draw"
        />
        <input
          type="number"
          name="pointsPerExactScore"
          value={form.pointsPerExactScore}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          placeholder="Points per exact score"
        />
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

      <input
        type="text"
        name="participants"
        placeholder="Participants (comma-separated UIDs)"
        value={form.participants}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Tournament
      </button>
    </form>
  );
};

export default TournamentForm;
