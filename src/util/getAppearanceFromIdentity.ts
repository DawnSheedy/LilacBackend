import { APIUser } from "@discordjs/core";
import { getDiscordCDNUrl } from "./getDiscordCDNUrl";

export const getAppearanceFromIdentity = (identity: APIUser) => {
  return {
    userName: identity.username,
    displayName: identity.global_name,
    avatarUrl: getDiscordCDNUrl("avatars", identity.id, identity.avatar),
    bannerUrl: identity.banner
      ? getDiscordCDNUrl("banners", identity.id, identity.banner)
      : null,
    color: identity.accent_color ?? null,
    lastAppearanceRefresh: new Date(),
  };
};
