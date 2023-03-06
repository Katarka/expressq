import express from 'express'
import routerPost from "./router/routerPost.js";
import * as dotenv from 'dotenv'
import Post from './Model/Post.js';
import Gallery from "./Model/Gallery.js";
import { sequelize } from './db.js';
import { server } from './Schema/Graphql.js';
import fileupload from 'express-fileupload'
import routerGallery from "./router/routerGallery.js";
import bodyParser from 'body-parser'
import mailer from './nodemailer.js'
import smtp from './config.js';
import cors from 'cors'

dotenv.config()

const PORT = process.env.SERVER_PORT
const whitelist = ['http://127.0.0.1:5173']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const app = express()

app.use(express.json())
app.use(express.static('static/post'))
app.use(express.static('static/gallery'))
app.use(fileupload({}))
app.use('/api', routerPost, routerGallery)

app.use(bodyParser.urlencoded({extended: false}))

app.post('/feedback', cors(corsOptions), (req, res, next) => {
    if(!req.body.name || !req.body.phone) return res.status(400)
    const message = {
        to: smtp.to,
        subject: 'Task',
        text: '',
        html: `<h3>New task!</h3>
        <b>Имя:</b> ${req.body.name} </br>
        <b>Телефон:</b> ${req.body.phone}`
    }
    mailer(message)
    res.redirect(301, 'http://127.0.0.1:5173/')
})

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
