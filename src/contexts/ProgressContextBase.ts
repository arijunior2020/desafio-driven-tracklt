import { createContext } from "react";

export interface ProgressContextType {
  progress: number;
  setProgress: (value: number) => void;
}

export const ProgressContext = createContext<ProgressContextType>({
  progress: 0,
  setProgress: () => {},
});
