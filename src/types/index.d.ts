import { DiscordServer } from "../models/DiscordServer";
import { DiscordUser } from "../models/DiscordUser";

export {}

declare global {
    namespace Express {
      export interface Request {
        user?: DiscordUser;
        server?: DiscordServer
      }
    }
  }