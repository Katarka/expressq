import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js";


const PORT = 5000
const db = `mongodb+srv://user:22042204Q@cluster0.qwnsk8j.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json('Server Page')
})

async function startApp() {
    try {
        await mongoose.set('strictQuery', false)
        await mongoose.connect(db)
        app.listen(PORT, () => console.log('Server work ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()

