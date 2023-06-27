import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { generateHelpfulErrorJson } from "../../../util/generateHelpfulErrorJson";

/**
 * Generate a new token for the client
 * @param req
 * @param res
 */
export const generateNewClientToken = async (req: Request, res: Response) => {
  const client = await req.server.getMinecraftClient();

  if (!client) {
    return res
      .status(404)
      .json(
        generateHelpfulErrorJson(
          "missing_client",
          "No minecraft client exists for specified server."
        )
      );
  }

  const token = sign({ clientId: client.id }, process.env.SECRET);

  client.setAttributes({ token });
  await client.save();

  res.json({ token });
};
