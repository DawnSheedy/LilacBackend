import { Router } from "express";
import { roleConfigMiddleware } from "../../../middleware/roleConfigMiddleware";
import { getRoleConfig } from "./getRoleConfig";
import { getRoleConfigs } from "./getRoleConfigs";

const roleConfigApi = Router();

roleConfigApi.param("roleConfigId", roleConfigMiddleware);

roleConfigApi.get("/:roleConfigId", getRoleConfig);

roleConfigApi.get("/", getRoleConfigs);

export { roleConfigApi };
