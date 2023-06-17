import { Router, json } from "express";
import { getUser } from "./getUser";
import { discordVerificationMiddleware } from "../../middleware/discordVerificationMiddleware";
import { getDiscordUrl } from "./getDiscordUrl";
import { postDiscordCode } from "./postDiscordCode";

const authApi = Router();

authApi.use(json());

authApi.get("/user", discordVerificationMiddleware, getUser);

authApi.get("/discord-url", getDiscordUrl);

authApi.post("/discord-code", postDiscordCode);

export { authApi };
