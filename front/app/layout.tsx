import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "../components/Providers";
import AppShell from "@/components/general/AppShell";
import PersistGateProvider from "@/components/PersistGateProvider";
import ToastProvider from "@/components/ToastProvider";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <PersistGateProvider>
            <ToastProvider />
            <AppShell>{children}</AppShell>
          </PersistGateProvider>
        </Providers>
      </body>
    </html>
  );
}
