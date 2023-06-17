import { APIGuild, APIRole } from "@discordjs/core";
import { DiscordServer } from "../../models/DiscordServer";
import { generateRoleMap } from "../../util/generateRoleMap";
import { DiscordRole } from "../../models/DiscordRole";

/**
 * Update all stored roles for a server
 * @param server
 * @param dbRendition
 */
export const updateServerRoles = async (
  server: APIGuild,
  dbRendition: DiscordServer
) => {
  const dbRoles = await dbRendition.getDiscordRoles();
  const roleMap = generateRoleMap(server.roles);

  // Delete roles that don't need to exist anymore.
  await Promise.all(
    dbRoles.map(async (role) => {
      const resolvedRole: APIRole = roleMap[role.id];
      if (resolvedRole) {
        return;
      }
      return role.destroy();
    })
  );

  for (const role of server.roles) {
    if (!role.id) continue;
    const [dbRole, created] = await DiscordRole.findOrCreate({
      where: { id: role.id },
      defaults: { name: role.name, color: role.color },
    });
    if (!created) {
      if (role.name === dbRole.name && role.color === dbRole.color) {
        continue;
      }
      console.log(`🏭️ Updating role: ${role.id}`);
      dbRole.setAttributes({ name: role.name, color: role.color });
      await dbRole.save();
    } else {
      console.log(`🏭️ Created role: ${role.id}`);
      dbRendition.addDiscordRole(dbRole);
    }
  }
};
