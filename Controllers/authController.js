import User from "../Model/User.js";
import bcrypt from 'bcryptjs'
import Role from "../Model/Role.js";
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config()

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({
                where: { username: username }
            })
            if(candidate){
                return res.status(400).json({message: 'Пользователь уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({
                where: { value: 'ADMIN' }
            })
            const user = new User({username, password: hashPassword, roles: userRole.value})
            await user.save()
            return res.json({message: 'Пользователь зарегистрирован'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try{
            const {username, password} = req.body
            const user = await User.findOne({
                where: { username }
            })
            if(!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: `Пароль введен неверный`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res) {
        try{
            const users = await User.findAll()
            res.json(users)
        } catch (e) {

        }
    }
}

export default new authController()