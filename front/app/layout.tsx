import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "../components/Providers";
import AppShell from "@/components/general/AppShell";
import PersistGateProvider from "@/components/PersistGateProvider";
import ToastProvider from "@/components/ToastProvider";
import I18nProvider from "@/components/I18nProvider";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <I18nProvider> {/* ✅ Wrap at the top */}
          <Providers>
            <PersistGateProvider>
              <ToastProvider />
              <AppShell>{children}</AppShell>
            </PersistGateProvider>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
