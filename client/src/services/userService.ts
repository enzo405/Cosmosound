import { Catalog } from "models/Catalog";
import { Genre, Music } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist, UserDetails } from "models/User";
import { AccountFormData } from "pages/Account/AccountPage";
import { apiClient } from "./axiosService";

async function getMe(): Promise<UserDetails> {
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
  genre: string,
  signal?: AbortSignal,
) {
  if (pictureProfile instanceof File) {
    const formData = new FormData();
    formData.append("file", pictureProfile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    formData.append("genre", genre);

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
        genre,
      },
      { signal },
    );
  }
}

async function logout() {
  return apiClient.post("/auth/logout");
}

function like(item: Artist | Genre | Playlist | Catalog | Music): void {
  console.log("like item", item);
}

function removeLike(item: Artist | Genre | Playlist | Catalog | Music): void {
  console.log("removeLike item", item);
}

function saveData(data: AccountFormData): void {
  console.log("submit form data", data);
}

const UserService = {
  getMe,
  login,
  register,
  logout,
  like,
  removeLike,
  saveData,
};

export default UserService;
