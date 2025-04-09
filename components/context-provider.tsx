"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  refetchTrigger: number;
  triggerRefetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const triggerRefetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return (
    <UserContext.Provider value={{ refetchTrigger, triggerRefetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAdminContext must be used within a UserProvider");
  }
  return context;
};
