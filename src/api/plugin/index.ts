import { Router } from "express";
import { pluginVerificationMiddleware } from "../../middleware/pluginVerificationMiddleware";
import { getPluginIdentity } from "./getPluginIdentity";
import { postPing } from "./postPing";

const pluginApi = Router();

pluginApi.use(pluginVerificationMiddleware);

pluginApi.get("/identity", getPluginIdentity);

pluginApi.post("/ping", postPing);

export { pluginApi };
