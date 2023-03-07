import {Router} from "express"
import GalleryController from "../Controllers/GalleryController.js";
const GalleryRouter = new Router()

GalleryRouter.post('/galleries', GalleryController.create)
GalleryRouter.get('/galleries', GalleryController.getAll)
GalleryRouter.get('/galleries/:id', GalleryController.getOne)
GalleryRouter.put('/galleries', GalleryController.update)
GalleryRouter.delete('/galleries/:id', GalleryController.delete)

export default GalleryRouter