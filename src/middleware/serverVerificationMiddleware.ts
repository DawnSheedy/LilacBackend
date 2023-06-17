import { NextFunction, Request, Response } from "express";
import { generateHelpfulErrorJson } from "../util/generateHelpfulErrorJson";
import { DiscordServer } from "../models/DiscordServer";
import { checkAndUpdateServerRelations } from "../auth/checkAndUpdateServerRelations";

/**
 * Middleware to verify a user is authenticated with discord.
 * Must come after discord verification middleware.
 * @param req
 * @param res
 * @param next
 */
export const serverVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  const serverId = req.params.serverId;

  // ServerID not provided, bad request.
  if (!serverId) {
    return res
      .status(400)
      .json(
        generateHelpfulErrorJson(
          "missing_serverId",
          "No serverId was provided."
        )
      );
  }

  const server = await DiscordServer.findByPk(serverId);

  if (!server || !req.user.hasDiscordServer(server)) {
    return res
      .status(404)
      .json(
        generateHelpfulErrorJson(
          "server_not_found",
          "Requested serverId either does not exist or you do not have permission to access it."
        )
      );
  }

  const userHasPermission = await checkAndUpdateServerRelations(
    server,
    req.user
  );

  if (!userHasPermission) {
    return res
      .status(404)
      .json(
        generateHelpfulErrorJson(
          "server_not_found",
          "Requested serverId either does not exist or you do not have permission to access it."
        )
      );
  }

  req.server = server;

  next();
};
