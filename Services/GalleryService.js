import fileServiceGallery from "./fileServiceGallery.js";
import Gallery from "../Model/Gallery.js";

class GalleryService {
    async create(gallery, picture) {
        const fileName = fileServiceGallery.saveFile(picture)
        const createdGallery = await Gallery.create({...gallery, picture: fileName})
        return createdGallery
    }

    async getAll() {
        const galleries = await Gallery.findAll()
        return galleries
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID не указан')
        }
        const gallery = await Gallery.findOne({
            where: { id: id }
        })
        return gallery
    }

    async update(gallery) {
        if (!gallery.id) {
            throw new Error('ID не указан')
        }
        const updatedGallery = await Gallery.update(
            { ...gallery },
            { where: { id: gallery.id } }
        )
        return updatedGallery
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID не указан')
        }
        const gallery = await Gallery.destroy({ where: { id: id } })
        return gallery

    }
}

export default new GalleryService()