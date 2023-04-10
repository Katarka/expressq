import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

const secret = 'SECRET_KEY'

function roleMiddleware (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            Array.from(userRoles).forEach(() => {
                if (roles.includes(userRoles)) {
                    hasRole = true
                } console.log(roles, userRoles)
            })

            if (!hasRole) {
                console.log(hasRole)
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
}

export default roleMiddleware
