import { useState, ReactNode } from "react";
import { ProgressContext } from "./ProgressContextBase";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
