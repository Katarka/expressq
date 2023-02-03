import {ApolloServer, gql} from "apollo-server-express";
import Post from "../Model/Post.js";

const typeDefs = gql`
    type Query {
        Posts: [Post]
        Post(id: ID!): Post
    }
    type Post {
        author: String!,
        title: String!,
        content: String!,
        picture: String
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
        }
    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
})