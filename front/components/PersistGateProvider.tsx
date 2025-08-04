"use client";

import { ReactNode } from "react";

import { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: ReactNode;
}

const PersistGateProvider = ({ children }: Props) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistGateProvider;