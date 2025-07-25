// components/__tests__/MatchPrediction.test.tsx

import MatchPrediction from "@/components/match/MatchPrediction";
import { render, screen, fireEvent } from "@testing-library/react";


describe("MatchPrediction", () => {
  it("renders both teams with editable scores", () => {
    const mockMatchSummary = {
      homeTeamName: "Argentina",
      homeTeamCrest: "/flags/arg.png",
      awayTeamName: "France",
      awayTeamCrest: "/flags/fra.png",
      fullTimeScore: { home: 0, away: 0 },
      status: "Upcoming",
      utcDate: "2023-12-18T18:00:00Z",
      winner: ""
    };

    render(<MatchPrediction matchSummary={mockMatchSummary} />);

    // Check if team names are rendered
    expect(screen.getByText("Argentina")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();

    // Check if score inputs are present
    const homeScoreInput = screen.getByDisplayValue("0");
    const awayScoreInput = screen.getByDisplayValue("0");

    expect(homeScoreInput).toBeInTheDocument();
    expect(awayScoreInput).toBeInTheDocument();
  });
});
