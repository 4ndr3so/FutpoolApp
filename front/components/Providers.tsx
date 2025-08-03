"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import { AuthProvider } from "../context/AuthContext";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // avoid mismatch between SSR and client
  }, []);

  if (!isClient) return null; // or <div>Loading...</div>

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
