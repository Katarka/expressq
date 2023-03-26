import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config()

const authMiddleware = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        const decodedData = jwt.verify(token, process.env.SECRET)
        req.user = decodedData
        next()
    } catch (e) {
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
}

export default authMiddleware