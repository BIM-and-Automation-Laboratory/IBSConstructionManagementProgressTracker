const {ApolloServer} = require('apollo-server'); //find out if its okay for me to use express server
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB, {useNewUrlParser: true}) //connect to server
    .then (() => {
        console.log('MongoDB connected')//confirm that it's connected
        return server.listen({port: PORT}) //start server
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)//confirm that it's started
    })
    .catch(err => {
        console.log(err)
    })