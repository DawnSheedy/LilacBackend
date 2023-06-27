import { NextFunction, Request, Response } from "express";
import { verifyPluginToken } from "../auth/verifyPluginToken";
import { generateHelpfulErrorJson } from "../util/generateHelpfulErrorJson";
import { MinecraftClient } from "../models/MinecraftClient";

/**
 * Middleware to verify and load data required for plugin api
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const pluginVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pluginTokenDecode = verifyPluginToken(req);

  if (!pluginTokenDecode.verified) {
    return res
      .status(403)
      .json(
        generateHelpfulErrorJson(
          "not_authorized",
          "Invalid credentials provided."
        )
      );
  }

  const plugin = await MinecraftClient.findByPk(pluginTokenDecode.clientId);

  // If plugin not found or token is not the one saved to DB, fail.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!plugin || plugin.token !== token) {
    return res
      .status(404)
      .json(
        generateHelpfulErrorJson(
          "invalid_client",
          "Client does not exist or token is outdated."
        )
      );
  }

  req.server = await plugin.getDiscordServer();
  req.minecraftClient = plugin;

  next();
};
