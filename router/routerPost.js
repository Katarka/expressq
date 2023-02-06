import {Router} from "express"
import PostController from "../Controllers/PostController.js";
const routerPost = new Router()

routerPost.post('/posts', PostController.create)
routerPost.get('/posts', PostController.getAll)
routerPost.get('/posts/:id', PostController.getOne)
routerPost.put('/posts', PostController.update)
routerPost.delete('/posts/:id', PostController.delete)

export default routerPost