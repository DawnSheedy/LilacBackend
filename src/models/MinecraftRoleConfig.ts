import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";
import { DiscordServer } from "./DiscordServer";
import { DiscordRole } from "./DiscordRole";

class MinecraftRoleConfig extends Model {
  declare id: number;
  declare name: string;
}

MinecraftRoleConfig.init(
  {
    id: {
      type: DataTypes.NUMBER,
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
DiscordRole.hasOne(MinecraftRoleConfig, { onDelete: "SET_NULL" });

export { MinecraftRoleConfig };
