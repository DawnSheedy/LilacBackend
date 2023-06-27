import { Router } from "express";
import { pluginVerificationMiddleware } from "../../middleware/pluginVerificationMiddleware";
import { getPluginIdentity } from "./getPluginIdentity";
import { postPing } from "./postPing";
import { loginUser } from "./loginUser";
import { bodyValidationMiddleware } from "../../middleware/bodyValidationMiddleware";

const pluginApi = Router();

pluginApi.use(pluginVerificationMiddleware);

pluginApi.get("/identity", getPluginIdentity);

pluginApi.post("/ping", postPing);

pluginApi.post(
  "/login-user",
  bodyValidationMiddleware(["uuid", "name"]),
  loginUser
);

export { pluginApi };
