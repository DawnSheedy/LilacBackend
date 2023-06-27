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
  declare token: string;

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
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize: db }
);

MinecraftClient.belongsTo(DiscordServer);
DiscordServer.hasOne(MinecraftClient);

export { MinecraftClient };
