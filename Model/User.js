import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Role from "./Role.js";

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique:true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    roles: {
        type: DataTypes.STRING,
        references: {
            model: Role
        }
    }
})

export default User