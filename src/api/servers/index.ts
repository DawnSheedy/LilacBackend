import { Router } from "express";
import { discordVerificationMiddleware } from "../../middleware/discordVerificationMiddleware";
import { getServers } from "./getServers";
import { getServer } from "./getServer";
import { serverVerificationMiddleware } from "../../middleware/serverVerificationMiddleware";
import { getRoles } from "./getRoles";

const serverApi = Router()

serverApi.use(discordVerificationMiddleware)

serverApi.param('serverId', serverVerificationMiddleware)

serverApi.get('/', getServers)

serverApi.get('/:serverId', getServer)

serverApi.get('/:serverId/roles', getRoles)

export { serverApi }