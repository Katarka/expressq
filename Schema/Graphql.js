import {ApolloServer, gql} from "apollo-server-express";
import Post from "../Model/Post.js";
import Gallery from "../Model/Gallery.js";

const typeDefs = gql`
    type Query {
        Posts: [Post]
        Post(id: ID!): Post
        Galleries: [Gallery]
        Gallery(id: ID!): Gallery
    }
    type Post {
        author: String!,
        title: String!,
        content: String!,
        picture: String
    }
    type Gallery {
        name: String!,
        picture: String!
    }
`

const resolvers = {
    Query: {
        Posts() {
            return Post.findAll()
        },
        Post(_, {id}){
            return Post.findOne({
                where: { id: id }
            })
        },
        Galleries() {
            return Gallery.findAll()
        },
        Gallery(_, {id}){
            return Gallery.findOne({
                where: { id: id }
            })
        }
    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
})