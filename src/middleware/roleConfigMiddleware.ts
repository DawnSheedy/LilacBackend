import { NextFunction, Request, Response } from "express";
import { generateHelpfulErrorJson } from "../util/generateHelpfulErrorJson";
import { MinecraftRoleConfig } from "../models/MinecraftRoleConfig";

/**
 * Middleware to retrieve and check permissions on a Role Configuration
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const roleConfigMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roleConfigId = req.params.roleConfigId
    ? parseInt(req.params.roleConfigId, 10)
    : null;

  if (roleConfigId === null) {
    return res
      .status(400)
      .json(
        generateHelpfulErrorJson(
          "missing_config_id",
          "No role configuration ID was provided."
        )
      );
  }

  const roleConfig = await MinecraftRoleConfig.findByPk(roleConfigId);

  if (
    !roleConfig ||
    !req.user.hasDiscordServer(await roleConfig.getDiscordServer())
  ) {
    return res
      .status(404)
      .json(
        generateHelpfulErrorJson(
          "not_found",
          "The requested role configuration could not be found."
        )
      );
  }

  req.roleConfig = roleConfig;

  next();
};
