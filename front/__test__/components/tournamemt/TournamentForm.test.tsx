// ✅ Mocks come first
jest.mock("@/hooks/useCompetitions", () => ({
  useCompetitions: () => ({
    data: [
      { id: 2011, name: "DFB-Pokal" },
      { id: 2022, name: "Champions League" },
    ],
    isLoading: false,
  }),
}));

jest.mock("@/services/tournamentApi", () => ({
  createTournament: jest.fn(),
}));



// tests/components/TournamentForm.test.tsx
// __test__/components/tournament/TournamentForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TournamentForm from "@/components/tournament/TournamentForm";
import { createTournament } from "@/services/api/tournamentApi";

jest.mock("@/services/tournamentApi", () => ({
  createTournament: jest.fn(),
}));

jest.mock("@/hooks/useCompetitions", () => ({
  useCompetitions: () => ({
    data: [
      { id: 2011, name: "DFB-Pokal" },
      { id: 2022, name: "Champions League" },
    ],
    isLoading: false,
  }),
}));

const renderWithQuery = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("TournamentForm", () => {
  it("fills all fields and submits the correct data", async () => {
    renderWithQuery(<TournamentForm />);

    // Select competition
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "2011" }, // Matches mocked id
    });

    // Fill name
    fireEvent.change(screen.getByPlaceholderText("Tournament Name"), {
      target: { value: "World Cup 2026" },
    });

    // Fill points
    fireEvent.change(screen.getByPlaceholderText("Points per win"), {
      target: { value: "4" },
    });

    fireEvent.change(screen.getByPlaceholderText("Points per draw"), {
      target: { value: "2" },
    });
    // Fill points
    fireEvent.change(screen.getByPlaceholderText("Points per exact score"), {
      target: { value: "10" },
    });

    // Toggle allowPodiumPrediction (initial is true, toggle to false)
    fireEvent.click(screen.getByLabelText("Allow Podium Prediction"));

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /create tournament/i }));

    await waitFor(() => {
      expect(createTournament).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "World Cup 2026",
          ownerId: "qW6y6WWtedfX015TfI3F",
          idCompetition: 2011,
          competitionName: "DFB-Pokal",
          rules: {
            pointsPerWin: 4,
            pointsPerDraw: 2,
            pointsPerExactScore: 10,
            allowPodiumPrediction: false, // toggled
          },
          participants: [], // Assuming participants is an empty array
        })
      );
    });
  });
});
