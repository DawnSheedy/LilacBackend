import { Router, json } from "express";
import { authApi } from "./auth";
import { serverApi } from "./servers";
import {
  ApiNamespaceConfig,
  loadApiNamespaces,
} from "../util/loadApiNamespaces";
import { pluginApi } from "./plugin";

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
  {
    name: "🔌 Plugin Interface",
    path: "/plugin",
    router: pluginApi,
  },
];

const apiRouter = Router();

apiRouter.use(json());

loadApiNamespaces(apiRouter, API_NAMESPACES);

export { apiRouter as api };
