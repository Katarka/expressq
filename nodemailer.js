import nodemailer from 'nodemailer'
import smtp from './config.js'

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: smtp.user,
        accessToken: smtp.token
    }
},
    {
        from: `"Mail from " <${smtp.from}>`,
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email complite:', info)
    })
}

export default mailer