import { Router } from "express";
import { discordVerificationMiddleware } from "../../middleware/discordVerificationMiddleware";
import { getServers } from "./getServers";
import { getServer } from "./getServer";
import { serverVerificationMiddleware } from "../../middleware/serverVerificationMiddleware";
import { getRoles } from "./getRoles";

const serverApi = Router()

serverApi.use(discordVerificationMiddleware)

serverApi.param('id', serverVerificationMiddleware)

serverApi.get('/', getServers)

serverApi.get('/:id', getServer)

serverApi.get('/:id/roles', getRoles)

export { serverApi }