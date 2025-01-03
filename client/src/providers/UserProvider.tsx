import { UserContext } from "context/userContext";
import { UserDetails } from "models/User";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { useState } from "react";
import UserService from "services/userService";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        let user = await UserService.getMe();
        if (!user) {
          await UserService.refreshToken();
          user = await UserService.getMe();
        }
        setUser(user);
      } catch (error) {
        console.error("Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
