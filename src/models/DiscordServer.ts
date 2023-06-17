import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class DiscordServer extends Model {
    declare serverId: string
    declare lastAdminPermissionCheck: Date
}

DiscordServer.init({
    serverId: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    lastAdminPermissionCheck: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, { sequelize: db })

export { DiscordServer }