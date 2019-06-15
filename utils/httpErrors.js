const { createError } = require('apollo-errors');
const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server-express');

const httpErrors = {
  internalError: (message) => {
    throw new Error(message);
  },
  userAlreadyExist: () => {
    throw new UserInputError('User already exist');
  },
  userNotFound: () => {
    throw new UserInputError('User does not exist');
  },
  pageAlreadyExist: () => {
    throw new UserInputError('Page already exist');
  },
  pageNotFound: () => {
    throw new UserInputError('Page does not exist');
  },
  invalidEmail: () => {
    throw new AuthenticationError('Email does not exist');
  },
  invalidId: () => {
    throw new AuthenticationError('Id does not exist');
  },
  unauthorized: () => {
    throw new ForbiddenError('Unauthorized');
  },
  titleAlreadyExist: () => {
    throw new UserInputError('Title already exist');
  },
  failedAuthentication: () => {
    throw new AuthenticationError('Failed authentication');
  },
  failedAuthenticationToken: () => {
    throw new AuthenticationError('Failed authentication token');
  },
};

module.exports = httpErrors;
