import { UserContext } from "context/userContext";
import { UserDetails } from "models/User";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { useState } from "react";
import UserService from "services/userService";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await UserService.getMe();
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
