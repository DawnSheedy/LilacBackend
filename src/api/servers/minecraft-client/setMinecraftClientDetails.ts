import { Request, Response } from "express";
import { generateHelpfulErrorJson } from "../../../util/generateHelpfulErrorJson";
import { MinecraftClient } from "../../../models/MinecraftClient";

/**
 * Set minecraft client details
 * @param req
 * @param res
 * @returns
 */
export const setMinecraftClientDetails = async (
  req: Request,
  res: Response
) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json(generateHelpfulErrorJson("bad_request", "No name provided."));
  }

  let client = await req.server.getMinecraftClient();

  if (!client) {
    client = await MinecraftClient.create({ name: req.body.name });
    await client.setDiscordServer(req.server);
  } else {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    client.setAttributes({ name: req.body.name, lastPing: date });
    client = await client.save();
  }

  return res.json({ name: client.name });
};
