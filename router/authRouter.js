import {Router} from "express"
import authController from "../Controllers/authController.js";
import {check} from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const authRouter = new Router()

authRouter.post('/registration', [
    check('username', 'Имя пользователя пустое').notEmpty(),
    check('password', 'Пароль должен быть более 4 символов').isLength({min: 4})
], authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', roleMiddleware(['USER']), authController.getUsers)

export default authRouter