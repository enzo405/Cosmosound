import { UserContext } from "context/userContext";
import { PartialArtist } from "models/User";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { useState } from "react";
import UserService, { LikeType } from "services/userService";

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<PartialArtist | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const toggleLike = async (id: string, type: LikeType) => {
    switch (type) {
      case "album":
        setUser({
          ...user!,
          likedCatalogs: user?.likedCatalogs.includes(id)
            ? user?.likedCatalogs.filter((albumId) => albumId !== id)
            : [...user!.likedCatalogs, id],
        });
        break;
      case "artist":
        setUser({
          ...user!,
          likedArtists: user?.likedArtists.includes(id)
            ? user?.likedArtists.filter((artistId) => artistId !== id)
            : [...user!.likedArtists, id],
        });
        break;
      case "genre":
        setUser({
          ...user!,
          likedGenres: user?.likedGenres.includes(id)
            ? user?.likedGenres.filter((genreId) => genreId !== id)
            : [...user!.likedGenres, id],
        });
        break;
      case "playlist":
        setUser({
          ...user!,
          likedPlaylists: user?.likedPlaylists.includes(id)
            ? user?.likedPlaylists.filter((playlistId) => playlistId !== id)
            : [...user!.likedPlaylists, id],
        });
        break;
      case "song":
        setUser({
          ...user!,
          likedMusics: user?.likedMusics.includes(id)
            ? user?.likedMusics.filter((songId) => songId !== id)
            : [...user!.likedMusics, id],
        });
        break;
      default:
        break;
    }
  };

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

  const value = useMemo(() => ({ user, setUser, loading, toggleLike }), [user, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
