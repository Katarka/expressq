//Схема MongoDB
// import mongoose from 'mongoose'

// const Post = new mongoose.Schema({
//     author: {type: String, required: true},
//     title: {type: String, required: true},
//     content: {type: String, required: true},
//     picture: {type: String},
// })

// export default mongoose.model('Post', Post)

//Схема Postgres
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Post = sequelize.define('Post', {
    author: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING }
})

export default Post