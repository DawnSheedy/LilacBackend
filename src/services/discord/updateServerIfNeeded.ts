import { DiscordServer } from "../../models/DiscordServer";
import { updateServer } from "./updateServer";

export const updateServerIfNeeded = async (server: DiscordServer) => {
  if (
    new Date().getTime() - server.lastRefresh?.getTime() ??
    0 > 60 * 60 * 1000
  ) {
    return await updateServer({ id: server.id });
  }
  return server;
};
