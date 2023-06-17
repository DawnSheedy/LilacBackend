import { APIRole } from "@discordjs/core";
import { discordBotApi } from ".";
import { updateServerRendition } from "./updateServerRendition";
import { updateServer } from "./updateServer";
import { generateRoleMap } from "../../util/generateRoleMap";

const adminPermission = BigInt("0x0000000000000008");

/**
 * Given a user and server id, check if the user is an administrator in the server.
 * @param userId
 * @param serverId
 */
export const checkAdminPermissions = async (
  userId: string,
  serverId: string
) => {
  const server = await discordBotApi.guilds.get(serverId);
  await updateServer({ server, serverId: server.id });

  // Easy way out, user owns the server
  if (server.owner_id === userId) {
    return true;
  }

  // If user doesn't own it, check to see if any of their roles grant Administrator
  const user = await discordBotApi.guilds.getMember(serverId, userId);
  const roleMap = generateRoleMap(server.roles);

  const userHasPermission = user.roles.some((role) => {
    const userPermissions = BigInt(roleMap[role]?.permissions ?? "0");
    return (userPermissions & adminPermission) === adminPermission;
  });

  return userHasPermission;
};
