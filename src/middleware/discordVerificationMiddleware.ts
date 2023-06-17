import { NextFunction, Request, Response } from "express";
import { verifyDiscordConnection } from "../auth/verifyDiscordConnection";

/**
 * Middleware to verify a user is authenticated with discord.
 * @param req
 * @param res
 * @param next
 */
export const discordVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = await verifyDiscordConnection(req);
  if (!status.verified) {
    return res.sendStatus(401);
  }

  req.user = status.user;

  next();
};
