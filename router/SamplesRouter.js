import {Router} from "express"
import SamplesController from "../Controllers/SamplesController.js"
const SamplesRouter = new Router()

SamplesRouter.post('/samples', SamplesController.create)
SamplesRouter.get('/samples', SamplesController.getAll)
SamplesRouter.get('/samples/:id', SamplesController.getOne)
SamplesRouter.get('/samples/group/:group', SamplesController.getGroup)
SamplesRouter.put('/samples', SamplesController.update)
SamplesRouter.delete('/posts/:id', SamplesController.delete)

export default SamplesRouter