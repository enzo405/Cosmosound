import BadRequestException from "@/errors/BadRequestException";
import ServerException from "@/errors/ServerException";
import UnsupportedMediaTypeException from "@/errors/UnsupportedMediaTypeException";
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
  id: string,
): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new BadRequestException("File size exceeds the 10MB limit");
  }

  const dirPath = `/dev-CosmoSound/uploads/${
    type === "CT" ? "catalog-thumbnail" : "picture-profiles"
  }`;
  let targetDir;

  try {
    targetDir = await client.getFolder(dirPath);
    if (!targetDir) {
      targetDir = await client.createFolder(dirPath);
    }
  } catch (e) {
    throw new ServerException("Failed to access or create directory", e);
  }

  try {
    const fileName = `${id}.webp`;
    const webpBuffer = await sharp(file.buffer).webp().toBuffer();
    const uploadedFile = await targetDir.createFile(fileName, webpBuffer);
    const shareFile = await client.createShare({ fileSystemElement: uploadedFile });
    return shareFile.url;
  } catch (e) {
    throw new ServerException("Failed to upload the file", e);
  }
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
      throw new UnsupportedMediaTypeException(
        "Unsupported file format. Only m4a and mp4 are supported.",
      );
    }
  });

  const dirPath = `/dev-CosmoSound/uploads/catalogs/catalog-${data.idCatalog}`;
  let targetDir;

  try {
    targetDir = await client.getFolder(dirPath);
    if (!targetDir) {
      targetDir = await client.createFolder(dirPath);
    }
  } catch (e) {
    throw new ServerException("Failed to access or create directory", e);
  }

  const urls: Record<string, string> = {};
  await Promise.all(
    data.files.map(async (obj) => {
      try {
        const fileName = `${obj.idMusic}.${obj.music.mimetype.split("/")[1]}`;
        const uploadedFile = await targetDir.createFile(fileName, obj.music.buffer);
        urls[obj.idMusic] = uploadedFile.getUrl();
      } catch (e) {
        console.error("An error occurred while uploading the music:", e);
      }
    }),
  );

  return urls;
};

export default { uploadPicture, uploadMusics };
