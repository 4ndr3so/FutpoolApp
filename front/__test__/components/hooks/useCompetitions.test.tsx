
// tests/hooks/useCompetitions.test.ts
import React, { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useCompetitions } from "@/hooks/useCompetitions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import fetchMock from "jest-fetch-mock";

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);


describe("useCompetitions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches competitions successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { id: 2011, name: "DFB-Pokal" },
        { id: 2022, name: "Champions League" },
      ])
    );

    const { result } = renderHook(() => useCompetitions(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.length).toBe(2);
    expect(result.current.data?.[0].name).toBe("DFB-Pokal");
  });
});
