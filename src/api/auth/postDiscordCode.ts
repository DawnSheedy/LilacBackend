import { RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult } from "@discordjs/core";
import { updateOrRegisterUserAndGetJWTAndIdentity } from "../../auth/updateOrRegisterUserAndGetJWTAndIdentity";
import { discordOauthApi } from "../../services/discord";
import { getReturnableUserFromModel } from "../../util/getReturnableUserFromModel";
import { Request, Response } from "express";

/**
 * Endpoint to provide the oauth code from discord.
 */
export const postDiscordCode = (req: Request, res: Response) => {
    // Bad request, no code provided
    if (!req.body.discord_code) {
      return res.sendStatus(400);
    }
  
    discordOauthApi
      .tokenExchange({
        client_id: process.env.DISCORD_CLIENTID,
        client_secret: process.env.DISCORD_SECRET,
        code: req.body.discord_code,
        grant_type: "authorization_code",
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
      })
      .then((value) => {
        updateOrRegisterUserAndGetJWTAndIdentity(
          value as RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult
        )
          .then(({ user, token }) => {
            res.json({
              token,
              ...getReturnableUserFromModel(user),
            });
          })
          .catch((error) => {
            console.error(error);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(403);
      });
  }