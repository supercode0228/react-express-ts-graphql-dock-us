require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core");

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const { port, clientURI } = require('./config/config');

const app = express();

const corsOptions = {
  origin: clientURI,
  credentials: true,
  optionsSuccessStatus: 200,
};

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });
};
startServer();

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
