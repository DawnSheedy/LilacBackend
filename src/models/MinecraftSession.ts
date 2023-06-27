import {
  BelongsToCreateAssociationMixin,
  BelongsToCreateAssociationMixinOptions,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToSetAssociationMixinOptions,
  DataTypes,
  Model,
} from "sequelize";
import { MinecraftUser } from "./MinecraftUser";
import { DiscordServer } from "./DiscordServer";
import { db } from "../services/db";

class MinecraftSession extends Model {
  declare id: number;
  declare startTime: Date;
  declare endTime: Date | null;
  declare sessionInaccurate: boolean;

  getMinecraftUser: BelongsToGetAssociationMixin<MinecraftUser>;
  getDiscordServer: BelongsToGetAssociationMixin<DiscordServer>;

  setMinecraftUser: BelongsToSetAssociationMixin<
    MinecraftUser,
    BelongsToSetAssociationMixinOptions
  >;
  setDiscordServer: BelongsToSetAssociationMixin<
    DiscordServer,
    BelongsToSetAssociationMixinOptions
  >;
}

MinecraftSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sessionInaccurate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db }
);

MinecraftSession.belongsTo(DiscordServer);
DiscordServer.hasMany(MinecraftSession);
MinecraftSession.belongsTo(MinecraftUser);
MinecraftUser.hasMany(MinecraftSession);

export { MinecraftSession };
