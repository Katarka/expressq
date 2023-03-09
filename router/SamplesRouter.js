import {Router} from "express"
import SamplesController from "../Controllers/SamplesController.js"
const SamplesRouter = new Router()

SamplesRouter.post('/posts', SamplesController.create)
SamplesRouter.get('/posts', SamplesController.getAll)
SamplesRouter.get('/posts/:id', SamplesController.getOne)
SamplesRouter.get('/posts/:group', SamplesController.getGroup)
SamplesRouter.put('/posts', SamplesController.update)
SamplesRouter.delete('/posts/:id', SamplesController.delete)

export default SamplesRouter