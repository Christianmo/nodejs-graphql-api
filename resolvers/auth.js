const bcrypt = require('bcrypt');

const httpErrors = require('../utils/httpErrors');
const { getToken } = require('../utils/auth');

module.exports.auth = async (_, { email, password }, { User }) => {
  const user = await User.findOne({ email: email });
  if (!user) httpErrors.userNotFound();

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) httpErrors.unauthorized();

  return { 
    token: getToken({ id: user.id, email: user.email }) 
  };
}