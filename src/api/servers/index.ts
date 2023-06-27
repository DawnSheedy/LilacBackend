import { Router } from "express";
import { discordVerificationMiddleware } from "../../middleware/discordVerificationMiddleware";
import { getServers } from "./getServers";
import { getServer } from "./getServer";
import { serverVerificationMiddleware } from "../../middleware/serverVerificationMiddleware";
import { getRoles } from "./getRoles";
import { roleConfigApi } from "./role-configs";
import { loadApiNamespaces } from "../../util/loadApiNamespaces";
import { minecraftClientApi } from "./minecraft-client";

const serverApi = Router();

serverApi.use(discordVerificationMiddleware);

serverApi.param("id", serverVerificationMiddleware);

serverApi.get("/", getServers);

serverApi.get("/:id", getServer);

serverApi.get("/:id/roles", getRoles);

loadApiNamespaces(serverApi, [
  {
    name: "🛠️ Role Configurations",
    path: "/:id/role-configs",
    router: roleConfigApi,
  },
  {
    name: "🛠️ Minecraft Client",
    path: "/:id/minecraft-client",
    router: minecraftClientApi,
  },
]);

export { serverApi };
