import { Request, Response } from "express";

/**
 * Endpoint to retrieve the config for a role.
 * @param req 
 * @param res 
 */
export const getRoleConfig = (req: Request, res: Response) => {
  res.json(req.roleConfig);
};
