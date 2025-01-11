import { Response } from "express";
import nextcloudService from "@/services/nextcloud.service";
import { UserRequest } from "@/middlewares/auth.middleware";
import BadRequestException from "@/errors/BadRequestException";

const uploadPicture = async (req: UserRequest, res: Response): Promise<void> => {
  if (!req.file) {
    throw new BadRequestException("No file uploaded");
  }

  const { type } = req.body;
  if (!type) {
    throw new BadRequestException("You must specify a type of upload");
  }

  const fileUrl = await nextcloudService.uploadPicture(req.file, type, req.userId!);
  res.status(200).json({ fileUrl });
};

export default { uploadPicture };
