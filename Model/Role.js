import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Role = sequelize.define('Role', {
    value: { type: DataTypes.STRING, unique:true, defaultValue: 'USER' },
})

export default Role