import Post from "./Post.js";

class PostController {
    async create(req, res) {
        try {
            const { author, title, content, picture } = req.body
            const createdPost = await Post.create({ author, title, content, picture })
            res.json(createdPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await Post.findAll()
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                req.status(400).json({ message: 'ID не указан' })
            }
            const post = await Post.findOne({ where: { id: id } })
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const { id, author, title, content, picture } = req.body
            if (!id) {
                req.status(400).json({ message: 'ID не указан' })
            }
            const updatedPost = await Post.update(
                { author, title, content, picture },
                { where: { id: id } }
            )
            await Post.save()
            return res.status(200).json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                req.status(400).json({ message: 'ID не указан' })
            }
            const post = await Post.destroy({ where: { id: id } })
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController()