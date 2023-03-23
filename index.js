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

import bodyParser from 'body-parser'
import cors from 'cors'
import corsOptions from './Cors/CorsOptions.js';
import { createAgent } from '@forestadmin/agent';
import { createSequelizeDataSource } from '@forestadmin/datasource-sequelize';
import serve from 'express-static'
import { dirname } from 'path'
import { fileURLToPath } from 'url';

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

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(serve(__dirname + '/static'))
app.use(express.static('static/gallery'))
app.use(express.static('static/samples'))
app.use(fileupload({}))
app.use('/api', PostRouter, GalleryRouter, SamplesRouter)
app.use('/', MailerRouter) //cors(corsOptions)
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.status(200).json('Server work')
})

async function startApp() {
    try {
        await sequelize.authenticate()
        await Post.sync()
        await Gallery.sync({ alter: true })
        await Samples.sync()
        await server.start()
        server.applyMiddleware({ app, path: "/api/graphql" })
        app.listen(PORT, () => console.log('Connection successful'))
    } catch (e) {
        console.log(e)
    }
}

startApp()
