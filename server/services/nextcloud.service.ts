import { Client, Server } from "nextcloud-node-client";
import path from "path";

const NEXTCLOUD_BASE_URL = process.env.NEXTCLOUD_BASE_URL!;
const NEXTCLOUD_USERNAME = process.env.NEXTCLOUD_USERNAME!;
const NEXTCLOUD_PASSWORD = process.env.NEXTCLOUD_PASSWORD!;
const MAX_FILE_SIZE = 10000000;

const server: Server = new Server({
  basicAuth: { username: NEXTCLOUD_USERNAME, password: NEXTCLOUD_PASSWORD },
  url: NEXTCLOUD_BASE_URL,
});
const client = new Client(server);

const uploadPicture = async (
  file: Express.Multer.File,
  type: "MUSIC" | "PFP",
  userId: string
): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the 10MB limit");
  }

  const dirPath = `/dev-CosmoSound/uploads/${
    type === "MUSIC" ? "music-thumbnail" : "picture-profiles"
  }`;

  let targetDir;
  try {
    targetDir = await client.getFolder(dirPath);
  } catch (error) {
    targetDir = await client.createFolder(dirPath);
  }

  if (!targetDir) {
    throw new Error("Failed to access or create directory");
  }

  const fileName = `${userId}${path.extname(file.originalname)}`;
  const uploadedFile = await targetDir.createFile(fileName, file.buffer);
  const shareFile = await client.createShare({ fileSystemElement: uploadedFile });

  return shareFile.url;
};

export default { uploadPicture };
