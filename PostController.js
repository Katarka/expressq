import Post from "./Post.js";

class PostController {
    async create(req, res){
        try {
            const {author, title, content, picture} = req.body
            const createdPost = await Post.create({author, title, content, picture})
            res.json(createdPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const posts = await Post.find()
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res){

    }

    async update(req, res){

    }

    async delete(req, res){

    }
}

export default new PostController()