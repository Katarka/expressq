import Samples from "../Model/Samples.js";
import fileServiceSamples from "./fileServiceSamples.js";

class SamplesService {
    async create(samples, picture) {
        const fileName = fileServiceSamples.saveFile(picture)
        const createdSamples = await Samples.create({ ...samples, picture: fileName })
        return createdSamples
    }

    async getAll() {
        const samples = await Samples.findAll()
        return samples
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

    async getGroup(group) {
        if (!group) {
            throw new Error('Группа не указана')
        }
        const samples = await Samples.findAll({
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
        const samples = await Samples.destroy(
            { where: { id: id } }
        )
        return samples
    }
}

export default new SamplesService()