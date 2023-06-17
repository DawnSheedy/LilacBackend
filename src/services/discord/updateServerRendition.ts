import { APIGuild } from "@discordjs/core";
import { DiscordServer } from "../../models/DiscordServer";
import { getDiscordCDNUrl } from "../../util/getDiscordCDNUrl";

export const updateServerRendition = async (server: APIGuild, dbRendition: DiscordServer) => {
    dbRendition.setAttributes({
        lastRefresh: new Date(),
        serverName: server.name,
        serverIcon: server.icon ? getDiscordCDNUrl('icons', server.id, server.icon) : null,
        lastUpdateFailed: false
    })

    return await dbRendition.save()
}