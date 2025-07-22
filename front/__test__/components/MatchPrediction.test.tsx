// components/__tests__/MatchPrediction.test.tsx

import MatchPrediction from "@/components/match/MatchPrediction";
import { render, screen, fireEvent } from "@testing-library/react";


describe("MatchPrediction", () => {
  it("renders both teams with editable scores", () => {
    render(<MatchPrediction />);

    expect(screen.getByText("Argentina")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();

    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs.length).toBe(2);

    fireEvent.change(inputs[0], { target: { value: "3" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });

    expect(inputs[0]).toHaveValue(3);
    expect(inputs[1]).toHaveValue(2);
  });
});
