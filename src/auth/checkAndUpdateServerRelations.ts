import { DiscordServer } from "../models/DiscordServer";
import { DiscordUser } from "../models/DiscordUser";
import { UserServer } from "../models/UserServer";
import { checkAdminPermissions } from "../services/discord/checkAdminPermission";

/**
 * Check if a user has permission
 * @param server 
 * @param user 
 * @returns 
 */
export const checkAndUpdateServerRelations = async (server: DiscordServer, user: DiscordUser) => {
    let association = await UserServer.findOne({ where: { DiscordUserId: user.id, DiscordServerId: server.id}})
    
    const currentDate = new Date().getTime()
    const lastPermissionCheck = association.lastPermissionCheck?.getTime() || 0

    // 1 hour
    if (currentDate - lastPermissionCheck > 60*60*1000) {
        const userIsAdmin = await checkAdminPermissions(user.id, server.id)
        association.setAttributes({ lastPermissionCheck: new Date(), userHasPermission: userIsAdmin })
        association = await association.save()
    }
    
    return association.userHasPermission
}