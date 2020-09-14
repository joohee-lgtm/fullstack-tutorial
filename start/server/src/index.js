const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const {createStore} = require('./utils');

const LaunchAPI = require('./databases/launch');
const UserAPI = require('./databases/user');

const store = createStore();

const server = new ApolloServer({ 
    typeDefs,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({store})
    })
 });

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
})