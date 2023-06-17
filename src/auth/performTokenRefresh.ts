import { DiscordUser } from "../models/DiscordUser";
import { getDiscordAPIWithToken } from "../services/discord";
import { updateAuthTokens } from "./updateAuthTokens";

/**
 * Refresh access tokens if outdated
 * @param user
 * @returns 
 */
export const performTokenRefresh = async (user: DiscordUser) => {
  const currentDate = new Date();
  const expirationDate = user.tokenExpiration;

  if (expirationDate.getTime() - currentDate.getTime() > 24 * 60 * 60 * 1000) {
    return user;
  }

  console.log(`🔃 Refreshing Token for user: ${user.userName}`)

  const tokenRefresh = await getDiscordAPIWithToken(user.accessToken).oauth2.refreshToken({
    refresh_token: user.refreshToken,
    client_id: process.env.DISCORD_CLIENTID,
    client_secret: process.env.DISCORD_CLIENTSECRET,
    grant_type: "refresh_token",
  });

  return await updateAuthTokens(user, tokenRefresh.access_token, tokenRefresh.expires_in, tokenRefresh.refresh_token)
};
