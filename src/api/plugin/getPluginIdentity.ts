import { Request, Response } from "express";

/**
 * Get identity as plugin
 * @param req
 * @param res
 */
export const getPluginIdentity = async (req: Request, res: Response) => {
  res.json({ client: req.minecraftClient, server: req.server });
};
