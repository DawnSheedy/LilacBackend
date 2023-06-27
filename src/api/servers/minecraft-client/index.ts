import { Router } from "express";
import { getMinecraftClient } from "./getMinecraftClient";
import { setMinecraftClientDetails } from "./setMinecraftClientDetails";
import { generateNewClientToken } from "./generateNewClientToken";

const minecraftClientApi = Router();

minecraftClientApi.get("/", getMinecraftClient);

minecraftClientApi.post("/", setMinecraftClientDetails);

minecraftClientApi.post("/new-token", generateNewClientToken);

export { minecraftClientApi };
