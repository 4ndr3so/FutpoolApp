// components/general/AppShell.tsx
"use client";

import { useState } from "react";
import LateralMenu from "./LateralMenu";
import HeaderComp from "./HeaderComp";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div id="app-container" className="relative min-h-screen lg:flex bg-slate-50 text-slate-800">
      <LateralMenu isMenuOpen={isMenuOpen} />
      <div className="flex-1 flex flex-col">
        <HeaderComp toggleMenu={toggleMenu} />
        {isMenuOpen && (
          <div
            id="overlay"
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={toggleMenu}
          />
        )}
        {children}
      </div>
    </div>
  );
}
