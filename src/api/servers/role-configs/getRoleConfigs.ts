import { Request, Response } from "express";

/**
 * Get all role configs for a server.
 * @param req
 * @param res
 */
export const getRoleConfigs = (req: Request, res: Response) => {
  res.json({ roleConfigs: req.server.getMinecraftRoleConfigs() });
};
