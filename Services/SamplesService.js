import Samples from "../Model/Samples.js";

class SamplesService {
    async create(post) {
        // const fileName = fileService.saveFile(picture)
        const createdSamples = await Samples.create({ ...post })
        return createdSamples
    }

    async getAll() {
        const posts = await Samples.findAll()
        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID не указан')
        }
        const samples = await Samples.findOne({
            where: { id: id }
        })
        return samples
    }

    async getGrout(group) {
        if (!group) {
            throw new Error('Группа не указана')
        }
        const samples = await Samples.findOne({
            where: { group: group }
        })
        return samples
    }

    async update(samples) {
        if (!samples.id) {
            throw new Error('ID не указан')
        }
        const updatedSamples = await Samples.update(
            { ...samples },
            { where: { id: samples.id } }
        )
        return updatedSamples
    }

    async delete(id) {
        if (!id) {
            throw new Error('ID не указан')
        }
        const samples = await Samples.destroy({ where: { id: id } })
        return samples

    }
}

export default new SamplesService()