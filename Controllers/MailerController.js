import smtp from "../config.js"
import mailer from "../nodemailer.js"

class MailerController {
    async create(req, res) {
        if(!req.body.name || !req.body.phone) return res.status(400)
        const message = {
            to: smtp.to,
            subject: 'Task',
            text: '',
            html: `<h3>New task!</h3>
            <b>Имя:</b> ${req.body.name} </br>
            <b>Email:</b> ${req.body.email} </br>
            <b>Телефон:</b> ${req.body.phone}`
        }
        mailer(message)
    }
}

export default new MailerController()