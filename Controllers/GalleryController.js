import GalleryService from "../Services/GalleryService.js";


class GalleryController {
    async create(req, res) {
        try {
            const createdGallery = await GalleryService.create(req.body, req.files.picture)
            res.json(createdGallery)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const galleries = await GalleryService.getAll()
            return res.json(galleries)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const gallery = await GalleryService.getOne(req.params.id)
            return res.json(gallery)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedGallery = await GalleryService.update(req.body)
            return res.status(200).json(updatedGallery)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const gallery = await GalleryService.delete(req.params.id)
            return res.json(gallery)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new GalleryController()