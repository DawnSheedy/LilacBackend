import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class UserServer extends Model {
  declare lastPermissionCheck: Date | null;
  declare userHasPermission: boolean | null;
  declare discordUserId: string;
  declare discordServerId: string;
}

UserServer.init(
  {
    userHasPermission: DataTypes.BOOLEAN,
    lastPermissionCheck: DataTypes.DATE,
  },
  { timestamps: false, sequelize: db }
);

export { UserServer };
