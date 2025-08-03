
/// app/layout.tsx
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "../components/Providers";
import AppShell from "@/components/general/AppShell";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
