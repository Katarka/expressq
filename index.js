import express from 'express'
import * as dotenv from 'dotenv'
import Post from './Model/Post.js';
import Gallery from "./Model/Gallery.js";
import Samples from './Model/Samples.js';
import { sequelize } from './db.js';
import { server } from './Schema/Graphql.js';
import fileupload from 'express-fileupload'

import GalleryRouter from "./router/GalleryRouter.js";
import PostRouter from "./router/PostRouter.js";
import MailerRouter from './router/MailerRouter.js';
import SamplesRouter from './router/SamplesRouter.js';
import authRouter from "./router/authRouter.js";

import bodyParser from 'body-parser'
import cors from 'cors'
import corsOptions from './Cors/CorsOptions.js';
import { createAgent } from '@forestadmin/agent';
import { createSequelizeDataSource } from '@forestadmin/datasource-sequelize';
import User from "./Model/User.js";
import Role from "./Model/Role.js";


dotenv.config()

const PORT = process.env.SERVER_PORT

const app = express()

createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production'
})
    .addDataSource(createSequelizeDataSource(sequelize))
    .mountOnExpress(app)
    .start()

app.use(express.json())
app.use(express.static('static/post'))
app.use(express.static('static/gallery'))
app.use(express.static('static/samples'))
app.use(fileupload({}))
app.use('/api', PostRouter, GalleryRouter, SamplesRouter)
app.use('/', MailerRouter) //cors(corsOptions)
app.use('/auth', authRouter)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json('Server work')
})



async function startApp() {
    try {
        await sequelize.authenticate()
        await Post.sync()
        await Gallery.sync()
        await Samples.sync()
        await User.sync()
        await Role.sync()
        await server.start()
        server.applyMiddleware({ app, path: "/api/graphql" })
        app.listen(PORT, () => console.log('Connection successful'))
    } catch (e) {
        console.log(e)
    }
}

startApp()
