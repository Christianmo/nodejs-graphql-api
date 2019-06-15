const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync(`${__dirname}/private.key`, 'utf8');
const publicKey = fs.readFileSync(`${__dirname}/public.key`, 'utf8');

const options = {
  issuer: 'Landing',
  expiresIn: 60 * 60 * 60,
  algorithm: 'RS256',
  subject: 'cmo',
};

function getToken(payload) {
  try {
    return jwt.sign(payload, privateKey, options);
  } catch (err) {
    return false;
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, publicKey, options);
  } catch (err) {
    return false;
  }
}

function decodeToken(token) {
  return jwt.decode(token, { complete: true });
}

module.exports = {
  getToken,
  verifyToken,
  decodeToken,
};
