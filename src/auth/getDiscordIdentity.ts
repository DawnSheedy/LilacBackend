import { getDiscordAPIWithToken } from "../services/discord";

/**
 * Given a discord access token, get the users identity.
 * @param token
 * @returns
 */
export const getDiscordIdentity = async (token: string) => {
  const api = getDiscordAPIWithToken(token);

  const user = await api.users.getCurrent();

  return user;
};
