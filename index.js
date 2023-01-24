import express from 'express'
// import mongoose from 'mongoose'
import router from "./router.js";
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'
import Post from './Post.js';

dotenv.config()

const PORT = process.env.SERVER_PORT
// const db = process.env.MONGO
const sequelize = new Sequelize(process.env.CONNECTION_BD)

const app = express()

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json('Server work')
})

async function startApp() {
    try {
        // await mongoose.set('strictQuery', false)
        // await mongoose.connect(db)
        // app.listen(PORT, () => console.log('Server work ' + PORT))
        await sequelize.authenticate()
        await Post.sync()
        app.listen(PORT, () => console.log('Connection seccessfull'))
    } catch (e) {
        console.log(e)
    } finally {
        await sequelize.close()
    }
}

startApp()

export default sequelize