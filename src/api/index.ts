import { Router, json } from "express";
import { authApi } from "./auth";
import { serverApi } from "./servers";
import { roleConfigApi } from "./servers/role-configs";
import { API } from "@discordjs/core";
import {
  ApiNamespaceConfig,
  loadApiNamespaces,
} from "../util/loadApiNamespaces";

const API_NAMESPACES: ApiNamespaceConfig[] = [
  {
    name: "🔐 Authentication",
    path: "/auth",
    router: authApi,
  },
  {
    name: "🎙️ Discord Servers",
    path: "/servers",
    router: serverApi,
  },
];

const apiRouter = Router();

apiRouter.use(json());

loadApiNamespaces(apiRouter, API_NAMESPACES);

export { apiRouter as api };
