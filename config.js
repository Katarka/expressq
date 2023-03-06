import * as dotenv from 'dotenv'
dotenv.config()

const smtp = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    token: process.env.MAIL_TOKEN
}

export default smtp