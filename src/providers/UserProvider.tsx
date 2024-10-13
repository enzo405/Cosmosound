import { UserContext } from "context/userContext";
import { User } from "models/User";
import React, { PropsWithChildren, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import UserService from "services/userService";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const getUser = async () => {
      let user = localStorage.getItem("user");
      if (!user) return;

      setUser(UserService.getUser());
    };

    getUser();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
