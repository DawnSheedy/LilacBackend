import { DiscordServer } from "../models/DiscordServer";
import { DiscordUser } from "../models/DiscordUser";
import { MinecraftClient } from "../models/MinecraftClient";
import { MinecraftRoleConfig } from "../models/MinecraftRoleConfig";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: DiscordUser;
      server?: DiscordServer;
      roleConfig?: MinecraftRoleConfig;
      minecraftClient?: MinecraftClient;
    }
  }
}
