import { DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationMixinOptions, HasManyAddAssociationsMixin, HasManyAddAssociationsMixinOptions, HasManyGetAssociationsMixin, HasManyRemoveAssociationsMixin, HasManyRemoveAssociationsMixinOptions, Model } from "sequelize";
import { db } from "../services/db";
import { DiscordRole } from "./DiscordRole";

class DiscordServer extends Model {
    declare id: string
    declare lastRefresh: Date | null
    declare serverName: string | null
    declare serverIcon: string | null
    declare lastUpdateFailed: boolean

    getDiscordRoles: HasManyGetAssociationsMixin<DiscordRole>
    addDiscordRole: HasManyAddAssociationMixin<DiscordRole, HasManyAddAssociationMixinOptions>
    addDiscordRoles: HasManyAddAssociationsMixin<DiscordRole, HasManyAddAssociationsMixinOptions>
    removeDiscordRoles: HasManyRemoveAssociationsMixin<DiscordRole, HasManyRemoveAssociationsMixinOptions>
}

DiscordServer.init({
    id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    lastRefresh: {
        type: DataTypes.DATE,
    },
    serverName: {
        type: DataTypes.STRING,
    },
    serverIcon: {
        type: DataTypes.STRING
    },
    lastUpdateFailed: {
        type: DataTypes.BOOLEAN
    }
}, { sequelize: db })

DiscordServer.hasMany(DiscordRole)
DiscordRole.belongsTo(DiscordServer)

export { DiscordServer }