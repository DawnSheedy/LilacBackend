import { DataTypes, HasManyGetAssociationsMixin, Model } from "sequelize";
import { db } from "../services/db";
import { MinecraftSession } from "./MinecraftSession";

class MinecraftUser extends Model {
  declare id: string;
  declare name: string;

  getMinecraftSessions: HasManyGetAssociationsMixin<MinecraftSession>;
}

MinecraftUser.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db }
);

export { MinecraftUser };
