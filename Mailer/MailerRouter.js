import { Router } from "express";
import MailerController from "./MailerController.js";

const MailerRouter = new Router()

MailerRouter.post('/feedback', MailerController.create)

export default MailerRouter