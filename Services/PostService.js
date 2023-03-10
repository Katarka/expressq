import Post from "../Model/Post.js";
import fileServicePost from "./fileServicePost.js";

class PostService {
    async create(post, picture) {
            const fileName = fileServicePost.saveFile(picture)
            const createdPost = await Post.create({...post, picture: fileName})
            return createdPost
    }

    async getAll() {
            const posts = await Post.findAll()
            return posts
    }

    async getOne(id) {
            if (!id) {
                throw new Error('ID не указан')
            }
            const post = await Post.findOne({
                    where: { id: id }
                })
            return post
    }

    async update(post) {
            if (!post.id) {
                throw new Error('ID не указан')
            }
            const updatedPost = await Post.update(
                { ...post },
                { where: { id: post.id } }
            )
            return updatedPost
    }

    async delete(id) {
            if (!id) {
                throw new Error('ID не указан')
            }
            const post = await Post.destroy({ where: { id: id } })
            return post

    }
}

export default new PostService()