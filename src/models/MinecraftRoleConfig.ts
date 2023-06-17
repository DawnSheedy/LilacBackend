import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class MinecraftRoleConfig extends Model {
    declare id: number;
    declare name: string;
}

MinecraftRoleConfig.init({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: db })

export { MinecraftRoleConfig }