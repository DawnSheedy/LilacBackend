import { Router } from "express";
import { discordVerificationMiddleware } from "../../middleware/discordVerificationMiddleware";
import { getServers } from "./getServers";
import { getServer } from "./getServer";
import { serverVerificationMiddleware } from "../../middleware/serverVerificationMiddleware";

const serverApi = Router()

serverApi.use(discordVerificationMiddleware)

serverApi.param('serverId', serverVerificationMiddleware)

serverApi.get('/', getServers)

serverApi.get('/:serverId', getServer)

export { serverApi }