import { Request, Response } from "express";
import nextcloudService from "@/services/nextcloud.service";

const uploadPicture = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const { type } = req.body;
    if (!type) {
      res.status(400).json({ message: "You must specify a type of upload" });
      return;
    }

    const fileUrl = await nextcloudService.uploadPicture(req.file, type);
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error("Error uploading file to Nextcloud:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

export default { uploadPicture };
