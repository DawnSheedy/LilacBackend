import { UserReturnType } from "../interfaces/apiReturnTypes/UserReturnType";
import { DiscordUser } from "../models/DiscordUser";

export const getReturnableUserFromModel = (
  user: DiscordUser
): UserReturnType => ({
  userName: user.userName,
  displayName: user.displayName,
  avatarUrl: user.avatarUrl,
  bannerUrl: user.bannerUrl,
  color: user.color,
});
