import express from 'express'
import * as dotenv from 'dotenv'
import Post from './Model/Post.js';
import Gallery from "./Model/Gallery.js";
import { sequelize } from './db.js';
import { server } from './Schema/Graphql.js';
import fileupload from 'express-fileupload'

import GalleryRouter from "./router/GalleryRouter.js";
import PostRouter from "./router/PostRouter.js";
import MailerRouter from './router/MailerRouter.js';

import bodyParser from 'body-parser'
import cors from 'cors'
import corsOptions from './Cors/CorsOptions.js';

dotenv.config()

const PORT = process.env.SERVER_PORT


const app = express()

app.use(express.json())
app.use(express.static('static/post'))
app.use(express.static('static/gallery'))
app.use(fileupload({}))
app.use('/api', PostRouter, GalleryRouter)
app.use('/', cors(corsOptions), MailerRouter)
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json('Server work')
})

async function startApp() {
    try {
        await sequelize.authenticate()
        await Post.sync()
        await Gallery.sync()
        await server.start()
        server.applyMiddleware({app})
        app.listen(PORT, () => console.log('Connection successful'))
    } catch (e) {
        console.log(e)
    } 
}

startApp()
