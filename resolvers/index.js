const bcrypt = require('bcrypt');
const httpErrors = require('../utils/httpErrors');
const { getToken } = require('../utils/auth');
const { auth } = require('./auth');
const { getUser, getUsers, addUser, updateUser, removeUser } = require('./users');
const { getPage, getPages, addPage, updatePage, removePage } = require('./pages');

const resolvers = {
  Query: {
    login: auth,
    user: getUser,
    users: getUsers,
    pages: getPages,
  },

  Mutation: {
    addUser: addUser,
    updateUser: updateUser,
    removeUser: removeUser,
    addPage: addPage,
  }
}

module.exports = resolvers;
