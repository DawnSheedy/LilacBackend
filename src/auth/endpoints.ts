import { Router, json } from "express";
import { discordVerificationMiddleware } from "./discordVerificationMiddleware";
import { discordOauthApi } from "../services/discord";
import { updateOrRegisterUserAndGetJWTAndIdentity } from "./updateOrRegisterUserAndGetJWTAndIdentity";
import { RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult } from "@discordjs/core";
import { getReturnableUserFromModel } from "../util/getReturnableUserFromModel";

const authApi = Router();

authApi.use(json());

authApi.get("/user", discordVerificationMiddleware, (req, res) => {
  res.json(getReturnableUserFromModel(req.user));
});

authApi.get("/discord-url", (req, res) => {
  const discordURL = discordOauthApi.generateAuthorizationURL({
    client_id: process.env.DISCORD_CLIENTID,
    response_type: "code",
    scope: process.env.DISCORD_SCOPE,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  });
  res.json({
    authUrl: discordURL + `&permissions=${process.env.DISCORD_PERMISSIONS}`,
  });
});

authApi.post("/discord-code", (req, res) => {
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
});

export { authApi };
