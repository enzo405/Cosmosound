import { Request, Response } from "express";
import nextcloudService from "@/services/nextcloud.service";
import { UserRequest } from "@/middlewares/auth.middleware";

const uploadPicture = async (req: UserRequest, res: Response): Promise<void> => {
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

    const fileUrl = await nextcloudService.uploadPicture(req.file, type, req.userId!);
    res.status(200).json({ fileUrl });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error uploading file" });
  }
};

export default { uploadPicture };
