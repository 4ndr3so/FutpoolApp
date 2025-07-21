// app/layout.tsx
// app/layout.tsx
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "../components/Providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
