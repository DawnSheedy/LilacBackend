import { BelongsToGetAssociationMixin, DataTypes, Model } from "sequelize";
import { db } from "../services/db";
import { DiscordServer } from "./DiscordServer";
import { DiscordRole } from "./DiscordRole";

class MinecraftRoleConfig extends Model {
  declare id: number;
  declare name: string;

  getDiscordServer: BelongsToGetAssociationMixin<DiscordServer>
}

MinecraftRoleConfig.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db }
);

DiscordServer.hasMany(MinecraftRoleConfig);
MinecraftRoleConfig.belongsTo(DiscordServer);
DiscordRole.hasOne(MinecraftRoleConfig);
MinecraftRoleConfig.belongsTo(DiscordRole);

export { MinecraftRoleConfig };
