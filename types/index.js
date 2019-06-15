const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    login(email: String, password: String): Auth
    user(id: ID!): User
    users: [User]
    pages: [Page]
  }

  type Mutation {
    addUser(
      name: String, 
      email: String,
      password: String
    ): User
    updateUser(
      id: ID,
      name: String, 
      email: String
    ): User
    removeUser(
      id: ID!
    ): Message
    addPage(
      title: String, 
      body: String,
    ): Page
  }

  type Auth {
    token: String
    user: User
  }
  
  type User {
    id: ID!
    name: String
    email: String
    password: String
  }
  
  type Page {
    title: String
    body: String
  }

  type Message {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;