import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Samples = sequelize.define('Samples', {
    name: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING }
})

export default Samples