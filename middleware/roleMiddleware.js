import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            const {roles: userRoles} = jwt.verify(token, process.env.SECRET)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if(!hasRole){
                return res.status(403).json({message: 'Нет доступа'})
            }
            next()
        } catch (e) {
            return res.status(403).json({message: 'Ошибка'})
        }
    }
}

export default roleMiddleware