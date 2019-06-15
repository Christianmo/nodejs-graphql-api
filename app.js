const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/User');
const Page = require('./models/Page');
const { ApolloServer, gql } = require('apollo-server-express');
const  typeDefs = require('./types');
const  resolvers = require('./resolvers');
const auth = require('./utils/auth');

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => { 
  const me = auth.decodeToken(req.headers.authorization);

  return { User, Page, me } 
} });
server.applyMiddleware({ app, path: '/gqlapi' });

const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/landing', { useNewUrlParser: true }, () => {
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:3001${server.graphqlPath}`)
  })
});
