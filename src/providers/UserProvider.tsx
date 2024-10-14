import { UserContext } from "context/userContext";
import { User } from "models/User";
import React, { PropsWithChildren, useMemo } from "react";
import { useState } from "react";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
