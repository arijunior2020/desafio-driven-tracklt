import { useState, useEffect, ReactNode } from "react";
import { UserContext } from "./UserContextBase";
import { User } from "../types/user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("trackit_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
