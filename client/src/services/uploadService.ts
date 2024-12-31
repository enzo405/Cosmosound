import { apiClient } from "./axiosService";

const uploadPicture = async (file: File, type: "MUSIC" | "PFP"): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const response = await apiClient.post<{ fileUrl: string }>("/api/upload/image", formData);
    return response.data.fileUrl;
  } catch (error) {
    throw new Error("Failed to upload file. Please try again.");
  }
};

const UploadService = {
  uploadPicture,
};

export default UploadService;
