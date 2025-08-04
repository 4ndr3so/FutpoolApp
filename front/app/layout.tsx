
/// app/layout.tsx
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "../components/Providers";
import AppShell from "@/components/general/AppShell";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";
import PersistGateProvider from "@/components/PersistGateProvider";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <PersistGateProvider>
            <AppShell>{children}</AppShell>
          </PersistGateProvider>

        </Providers>
      </body>
    </html>
  );
}
