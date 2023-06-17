import { DataTypes, Model } from "sequelize";
import { db } from "../services/db";

class DiscordRole extends Model {
    declare id: string;
    declare name: string;
    declare color: number | null;
}

DiscordRole.init({
    id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.INTEGER
    }
}, { sequelize: db })

export { DiscordRole }