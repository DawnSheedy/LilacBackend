import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationMixinOptions,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyGetAssociationsMixinOptions,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationMixinOptions,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationMixinOptions,
  DataTypes,
  Model,
} from "sequelize";
import { db } from "../services/db";
import { DiscordServer } from "./DiscordServer";
import { UserServer } from "./UserServer";

class DiscordUser extends Model {
  declare id: string;
  declare accessToken: string;
  declare refreshToken: string;
  declare tokenExpiration: Date;
  declare userName: string;
  declare displayName: string | null;
  declare avatarUrl: string | null;
  declare bannerUrl: string | null;
  declare color: number | null;
  declare lastAppearanceRefresh: Date;

  declare getDiscordServers: BelongsToManyGetAssociationsMixin<DiscordServer>;
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
    displayName: {
      type: DataTypes.STRING,
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

DiscordServer.belongsToMany(DiscordUser, { through: UserServer });
DiscordUser.belongsToMany(DiscordServer, { through: UserServer });

export { DiscordUser };
