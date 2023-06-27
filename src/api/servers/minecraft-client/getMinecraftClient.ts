import { Request, Response } from "express";

/**
 * Endpoint to get the minecraft client for a given discord server
 * @param req
 * @param res
 */
export const getMinecraftClient = async (req: Request, res: Response) => {
  res.json(await req.server.getMinecraftClient());
};
