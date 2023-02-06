import {Router} from "express"
import GalleryController from "../Controllers/GalleryController.js";
const routerGallery = new Router()

routerGallery.post('/galleries', GalleryController.create)
routerGallery.get('/galleries', GalleryController.getAll)
routerGallery.get('/galleries/:id', GalleryController.getOne)
routerGallery.put('/galleries', GalleryController.update)
routerGallery.delete('/galleries/:id', GalleryController.delete)

export default routerGallery