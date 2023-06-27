import { Request, Response } from "express";

/**
 * Post ping from server
 * @param req
 * @param res
 */
export const postPing = async (req: Request, res: Response) => {
  const minecraftClient = req.minecraftClient;
  minecraftClient.setAttributes({ lastPing: new Date() });
  res.json(await minecraftClient.save());
};
