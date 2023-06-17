import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class DiscordServer extends Model {
    declare serverId: string
}

DiscordServer.init({
    serverId: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
}, { sequelize: db })

export { DiscordServer }