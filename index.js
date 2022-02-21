//this index file is for the posting site diaries in the home page

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
    });

const path = require('path');
const express = require('express');
const cors = require('cors');
    
const PORT2 = process.env.PORT2 || 4001;
const config = require('./config');
    
if (config.FORGE_CREDENTIALS.client_id == null || config.FORGE_CREDENTIALS.client_secret == null) {
        console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
        return;
    }
    
    let app = express();

    const corsOption = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    };
    
    app.use(cors(corsOption));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json({ limit: '50mb' }));
    app.use('/api/forge/oauth', require('./routes/oauth'));
    // app.use('/api/forge/modelderivative', require('./routes/modelderivative'));
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(err.statusCode).json(err);
    });
    app.listen(PORT2, () => { console.log(`Server listening on port ${PORT2}`); });
    