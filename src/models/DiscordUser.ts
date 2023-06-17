import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationMixinOptions,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationMixinOptions,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationMixinOptions,
  DataTypes,
  Model,
} from "sequelize";
import { db } from "../services/db";
import { DiscordServer } from "./DiscordServer";

class DiscordUser extends Model {
  declare id: string;
  declare accessToken: string;
  declare refreshToken: string;
  declare tokenExpiration: Date;
  declare userName: string;
  declare avatarUrl: string | null;
  declare bannerUrl: string | null;
  declare color: number | null;
  declare lastAppearanceRefresh: Date;

  declare hasDiscordServer: BelongsToManyHasAssociationMixin<
    DiscordServer,
    BelongsToManyHasAssociationMixinOptions
  >;
  declare addDiscordServer: BelongsToManyAddAssociationMixin<
    DiscordServer,
    BelongsToManyAddAssociationMixinOptions
  >;
  declare removeDiscordServer: BelongsToManyRemoveAssociationMixin<
    DiscordServer,
    BelongsToManyRemoveAssociationMixinOptions
  >;
}

DiscordUser.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenExpiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    bannerUrl: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.INTEGER,
    },
    lastAppearanceRefresh: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize: db }
);

DiscordServer.belongsToMany(DiscordUser, { through: "UserServers" });
DiscordUser.belongsToMany(DiscordServer, { through: "UserServers" });

export { DiscordUser };
