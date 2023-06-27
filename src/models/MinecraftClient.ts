import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToSetAssociationMixinOptions,
  DataTypes,
  Model,
} from "sequelize";
import { db } from "../services/db";
import { DiscordServer } from "./DiscordServer";

class MinecraftClient extends Model {
  declare id: number;
  declare name: string;
  declare token: string | null;
  declare lastPing: Date;

  getDiscordServer: BelongsToGetAssociationMixin<DiscordServer>;

  setDiscordServer: BelongsToSetAssociationMixin<
    DiscordServer,
    BelongsToSetAssociationMixinOptions
  >;
}

MinecraftClient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    lastPing: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize: db }
);

MinecraftClient.belongsTo(DiscordServer);
DiscordServer.hasOne(MinecraftClient);

export { MinecraftClient };
