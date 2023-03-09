import SamplesService from "../Services/SamplesService.js"

class PostController {
    async create(req, res) {
        try {
            const createdSamples = await SamplesService.create(req.body)
            res.json(createdSamples)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const samples = await SamplesService.getAll()
            return res.json(samples)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const samples = await SamplesService.getOne(req.params.id)
            return res.json(samples)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getGroup(req, res) {
        try{
            const samples = await SamplesService.getGroup(req.params.group)
            return res.json(samples)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedSamples = await SamplesService.update(req.body)
            return res.status(200).json(updatedSamples)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const samples = await SamplesService.delete(req.params.id)
            return res.json(samples)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new PostController()