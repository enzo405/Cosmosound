import { Favourites, PartialArtist } from "./models/User";
import { AccountFormData } from "./pages/Account/AccountPage";
import { apiClient } from "./axiosService";
import { AxiosResponse } from "axios";
import { ArtistPanelFormData } from "./pages/ArtistPanel/ArtistPanelPage";

async function refreshToken(): Promise<AxiosResponse<any, any>> {
  return apiClient.post("/auth/refresh");
}

async function getMe(): Promise<PartialArtist> {
  return apiClient
    .get("/auth/me")
    .then((res) => res.data)
    .catch(() => undefined);
}

async function login(email: string, password: string) {
  return apiClient.post("/auth/login", {
    email,
    password,
  });
}

async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  pictureProfile: File | string,
  likedGenres: string[],
  signal?: AbortSignal,
) {
  if (pictureProfile instanceof File) {
    const formData = new FormData();
    formData.append("file", pictureProfile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("likedGenres", JSON.stringify(likedGenres));

    return await apiClient.post("/auth/register", formData, { signal });
  } else {
    return await apiClient.post(
      "/auth/register",
      {
        name,
        email,
        password,
        passwordConfirm,
        pictureProfile,
        likedGenres,
      },
      { signal },
    );
  }
}

async function logout() {
  return apiClient.post("/auth/logout");
}

export type LikeType = "artist" | "song" | "album" | "playlist" | "genre";

async function toggleLike(id: string, type: LikeType): Promise<void> {
  return await apiClient
    .post(`/api/me/like`, {
      id,
      type,
    })
    .then((res) => res.data);
}

async function updateAccount(dataForm: Partial<AccountFormData>): Promise<PartialArtist> {
  const formData = new FormData();
  dataForm.username && formData.append("username", dataForm.username);
  dataForm.email && formData.append("email", dataForm.email);
  dataForm.password && formData.append("password", dataForm.password);
  dataForm.confirmPassword && formData.append("confirmPassword", dataForm.confirmPassword);
  dataForm.image && formData.append("file", dataForm.image);

  return await apiClient.patch("/api/me", formData).then((res) => res.data);
}

async function updateArtist(dataForm: Partial<ArtistPanelFormData>): Promise<PartialArtist> {
  return await apiClient.patch("/api/me/artist", dataForm).then((res) => res.data);
}

async function getPrefered(): Promise<Favourites> {
  return await apiClient.get("/api/me/preferred").then((res) => res.data);
}

const UserService = {
  getMe,
  refreshToken,
  login,
  register,
  logout,
  toggleLike,
  updateAccount,
  updateArtist,
  getPrefered,
};

export default UserService;
