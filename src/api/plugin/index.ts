import { Router } from "express";
import { pluginVerificationMiddleware } from "../../middleware/pluginVerificationMiddleware";
import { getPluginIdentity } from "./getPluginIdentity";

const pluginApi = Router();

pluginApi.use(pluginVerificationMiddleware);

pluginApi.get("/identity", getPluginIdentity);

export { pluginApi };
