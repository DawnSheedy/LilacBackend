import { APIGuild } from "@discordjs/core";
import { DiscordServer } from "../../models/DiscordServer";
import { updateServerRendition } from "./updateServerRendition";
import { updateServerRoles } from "./updateServerRoles";
import { discordBotApi } from ".";

export const updateServer = async ({ server, serverId }: { server?: APIGuild, serverId: string }) => {
    let serverRetrievalFailure = false;
    if (!server) {
        try {
            server = await discordBotApi.guilds.get(serverId)
        } catch {
            serverRetrievalFailure = true;
        }
    }

    const dbRendition = await DiscordServer.findByPk(server?.id ?? serverId)

    if (!dbRendition) {
        throw new Error('Tried to request server that doesnt exist')
    }

    if (serverRetrievalFailure) {
        dbRendition.setAttributes({ lastUpdateFailed: true })
        return await dbRendition.save()
    }

    await updateServerRendition(server, dbRendition)
    await updateServerRoles(server, dbRendition)
    return await dbRendition.reload()
}