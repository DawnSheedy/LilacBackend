import { API, OAuth2API } from "@discordjs/core";
import { REST } from "@discordjs/rest";

console.log("🛠️ Setting up discord API...");
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
const discordOauthApi = new OAuth2API(rest);
const discordBotApi = new API(rest)

/**
 * Method to get access to a users API
 * @param token
 * @returns
 */
const getDiscordAPIWithToken = (token: string) => {
  const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
    token
  );
  return new API(rest);
};

export { discordOauthApi, discordBotApi, getDiscordAPIWithToken };
