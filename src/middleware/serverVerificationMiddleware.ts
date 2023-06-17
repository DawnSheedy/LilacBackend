import { NextFunction, Request, Response } from "express";
import { generateHelpfulErrorJson } from "../util/generateHelpfulErrorJson";
import { DiscordServer } from "../models/DiscordServer";
import { checkAndUpdateServerRelations } from "../auth/checkAndUpdateServerRelations";
import { updateServer } from "../services/discord/updateServer";

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
  const id = req.params.id;

  // ServerID not provided, bad request.
  if (!id) {
    return res
      .status(400)
      .json(
        generateHelpfulErrorJson(
          "missing_id",
          "No id was provided."
        )
      );
  }

  let server = await DiscordServer.findByPk(id);

  if (!server || !req.user.hasDiscordServer(server)) {
    return res
      .status(404)
      .json(
        generateHelpfulErrorJson(
          "server_not_found",
          "Requested id either does not exist or you do not have permission to access it."
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
          "Requested id either does not exist or you do not have permission to access it."
        )
      );
  }

  if (
    new Date().getTime() - server.lastRefresh?.getTime() ?? 0 > 60 * 60 * 1000
  ) {
    server = await updateServer({ id: server.id });
  }

  req.server = server;

  next();
};
