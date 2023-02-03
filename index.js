import express from 'express'
// import mongoose from 'mongoose'
import router from "./router.js";
import * as dotenv from 'dotenv'
import Post from './Model/Post.js';
import { sequelize } from './db.js';
import { server } from './Schema/Graphql.js';


dotenv.config()

const PORT = process.env.SERVER_PORT
// const db = process.env.MONGO

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
        await server.start()
        server.applyMiddleware({app})
        app.listen(PORT, () => console.log('Connection successful'))
    } catch (e) {
        console.log(e)
    } 
}

startApp()
