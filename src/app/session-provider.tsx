"use client";

import { Session } from "next-auth";
import { createContext, useContext } from "react";

const sessionContext = createContext<Session | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: Session | null }>) {
  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
