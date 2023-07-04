import { RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult } from "@discordjs/core";
import { getDiscordIdentity } from "./getDiscordIdentity";
import { DiscordUser } from "../models/DiscordUser";
import { updateAuthTokens } from "./updateAuthTokens";
import { sign } from "jsonwebtoken";
import { getAppearanceFromIdentity } from "../util/getAppearanceFromIdentity";
import { DiscordServer } from "../models/DiscordServer";
import { updateServer } from "../services/discord/updateServer";

/**
 * Given oauth token response, create or update the user, and add their server.
 * @param discordResponse
 * @returns
 */
export const updateOrRegisterUserAndGetJWTAndIdentity = async (
  discordResponse: RESTPostOAuth2AccessTokenWithBotAndGuildsScopeResult
) => {
  const expirationDate = new Date();
  expirationDate.setSeconds(
    expirationDate.getSeconds() + discordResponse.expires_in
  );

  const identity = await getDiscordIdentity(discordResponse.access_token);

  const existingEntry = await DiscordUser.findByPk(identity.id);

  const user = await (existingEntry
    ? updateAuthTokens(
        existingEntry,
        discordResponse.access_token,
        discordResponse.expires_in,
        discordResponse.refresh_token
      )
    : DiscordUser.create({
        id: identity.id,
        accessToken: discordResponse.access_token,
        refreshToken: discordResponse.refresh_token,
        tokenExpiration: expirationDate,
        ...getAppearanceFromIdentity(identity),
      }));

  const server =
    (await DiscordServer.findByPk(discordResponse.guild.id)) ??
    (await DiscordServer.create({
      id: discordResponse.guild.id,
      lastRefresh: new Date(),
    }));

  if (server && !(await user.hasDiscordServer(server))) {
    user.addDiscordServer(server, {
      through: { lastPermissionCheck: new Date(), userHasPermission: true },
    });
  }

  /**
   * Perform initial server update
   */
  await updateServer({ id: server.id });

  return {
    user,
    token: sign({ userId: user.id }, process.env.SECRET, { expiresIn: "7d" }),
  };
};
