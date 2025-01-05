import { Client, Server } from "nextcloud-node-client";
import sharp from "sharp";

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
  type: "CT" | "PFP",
  id: string
): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the 10MB limit");
  }

  const dirPath = `/dev-CosmoSound/uploads/${
    type === "CT" ? "catalog-thumbnail" : "picture-profiles"
  }`;

  let targetDir = await client.getFolder(dirPath);
  if (!targetDir) {
    targetDir = await client.createFolder(dirPath);
  }
  if (!targetDir) throw new Error("Failed to access or create directory");

  const webpBuffer = await sharp(file.buffer).webp().toBuffer();

  const fileName = `${id}.webp`;
  const uploadedFile = await targetDir.createFile(fileName, webpBuffer);
  const shareFile = await client.createShare({ fileSystemElement: uploadedFile });

  return shareFile.url;
};

interface UploadMusics {
  files: {
    idMusic: string;
    music: Express.Multer.File;
  }[];
  idCatalog: string;
}

const uploadMusics = async (data: UploadMusics): Promise<Record<string, string>> => {
  const allowedMimeTypes = ["audio/m4a", "audio/mp3", "audio/mpeg"];

  data.files.forEach((obj) => {
    if (!allowedMimeTypes.includes(obj.music.mimetype)) {
      throw new Error("Unsupported file format. Only m4a and mp4 are supported.");
    }
  });

  const dirPath = `/dev-CosmoSound/uploads/catalogs/catalog-${data.idCatalog}`;

  let targetDir = await client.getFolder(dirPath);
  if (!targetDir) {
    targetDir = await client.createFolder(dirPath);
  }
  if (!targetDir) throw new Error("Failed to access or create directory");

  const urls: Record<string, string> = {};
  await Promise.all(
    data.files.map(async (obj) => {
      try {
        const fileName = `${obj.idMusic}.${obj.music.mimetype.split("/")[1]}`;
        const uploadedFile = await targetDir.createFile(fileName, obj.music.buffer);
        urls[obj.idMusic] = uploadedFile.getUrl();
      } catch (e) {
        console.log("An error occurred while uploading the music:", e);
      }
    })
  );

  return urls;
};

export default { uploadPicture, uploadMusics };
