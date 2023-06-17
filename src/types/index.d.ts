import { DiscordUser } from "../models/DiscordUser";

export {}

declare global {
    namespace Express {
      export interface Request {
        user?: DiscordUser;
      }
    }
  }