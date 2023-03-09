import {ApolloServer, gql} from "apollo-server-express";
import Post from "../Model/Post.js";
import Gallery from "../Model/Gallery.js";
import Samples from "../Model/Samples.js";

const typeDefs = gql`
    type Query {
        Posts: [Post]
        Post(id: ID!): Post
        Galleries: [Gallery]
        Gallery(id: ID!): Gallery
        Samples: [Samples]
        Sample(id: ID!): Samples
        SampleGroup(group: String): [Samples]
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
    type Samples {
        name: String!,
        group: String!,
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
        },
        Galleries() {
            return Gallery.findAll()
        },
        Gallery(_, {id}){
            return Gallery.findOne({
                where: { id: id }
            })
        },
        Samples(){
            return Samples.findAll()
        },
        Sample(_, {id}){
            return Samples.findOne({
                where: { id: id }
            })
        },
        SampleGroup(_, {group}){
            return Samples.findAll({
                where: { group: group }
            })
        }
    }
}

export const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    formatError: error => {
        return error
    },
    context: ({ req, res }) => {
        return {
            req,
            res
        }
    }
})