import { Router } from "express";
import MailerController from "../Controllers/MailerController.js";

const MailerRouter = new Router()

MailerRouter.post('/feedback', MailerController.create)

export default MailerRouter