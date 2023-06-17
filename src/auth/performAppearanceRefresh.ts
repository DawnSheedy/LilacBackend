import { DiscordUser } from "../models/DiscordUser";
import { getAppearanceFromIdentity } from "../util/getAppearanceFromIdentity";
import { getDiscordIdentity } from "./getDiscordIdentity";

/**
 * Update information about the users account appearance if outdated.
 * @param user 
 * @returns 
 */
export const performAppearanceRefresh = async (user: DiscordUser) => {
  const currentDate = new Date();
  const lastCheck = user.lastAppearanceRefresh;

  if (currentDate.getTime() - lastCheck.getTime() < 24 * 60 * 60 * 1000) {
    return user;
  }

  console.log(`🔃 Refreshing Appearance for user: ${user.userName}`)

  const identity = await getDiscordIdentity(user.accessToken)

  user.setAttributes(getAppearanceFromIdentity(identity))

  return await user.save()
};
