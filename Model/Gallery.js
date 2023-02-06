import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Gallery = sequelize.define('Gallery', {
    name: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, allowNull: false }
})

export default Gallery