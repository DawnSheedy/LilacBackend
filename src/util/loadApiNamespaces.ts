import { Router } from "express";

export interface ApiNamespaceConfig {
  name: string;
  path: string;
  router: Router;
}

export const loadApiNamespaces = (
  parent: Router,
  namespaces: ApiNamespaceConfig[]
) => {
  console.log("📝 Registering API Endpoints");

  namespaces.forEach((namespace) => {
    console.log(
      `📝 Registering endpoints for ${namespace.name} ("${namespace.path}")`
    );
    parent.use(namespace.path, namespace.router);
  });

  console.log("✅ API Endpoints Registered");
};
