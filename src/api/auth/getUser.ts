import { Request, Response } from "express";
import { authApi } from ".";
import { discordVerificationMiddleware } from "../../middleware/discordVerificationMiddleware";
import { getReturnableUserFromModel } from "../../util/getReturnableUserFromModel";

/**
 * Endpoint to retrieve the current user.
 * Token must be provided. 401 if not authenticated.
 */
export const getUser = (req: Request, res: Response) => {
  res.json(getReturnableUserFromModel(req.user));
}
