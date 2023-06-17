import { Request, Response } from "express";
import { authApi } from ".";
import { discordOauthApi } from "../../services/discord";

/**
 * Endpoint to get the discord authentication URL for the application.
 */
export const getDiscordUrl = (req: Request, res: Response) => {
  const discordURL = discordOauthApi.generateAuthorizationURL({
    client_id: process.env.DISCORD_CLIENTID,
    response_type: "code",
    scope: process.env.DISCORD_SCOPE,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  });
  res.json({
    authUrl: discordURL + `&permissions=${process.env.DISCORD_PERMISSIONS}`,
  });
};
