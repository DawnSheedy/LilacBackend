import { Request, Response } from "express";

/**
 * Get roles for a server
 * @param req
 * @param res 
 */
export const getRoles = async (req: Request, res: Response) => {
  res.json({ roles: await req.server.getDiscordRoles() });
};
