import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.SERVER_PORT
// const db = `mongodb+srv://user:22042204Q@cluster0.qwnsk8j.mongodb.net/?retryWrites=true&w=majority`
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
        app.listen(PORT, () => console.log('Connection seccessfull'))
    } catch (e) {
        console.log(e)
    }
}

startApp()

