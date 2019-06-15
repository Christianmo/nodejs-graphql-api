const httpErrors = require('../utils/httpErrors');
const { validId } = require('../utils/validations');

module.exports.getUser = async (_, { id }, { User }) => {
  try {
    if (!validId(id)) httpErrors.invalidId();
    const user = await User.findById(id);
    if (!user) httpErrors.userAlreadyExist();
    return user;
  } catch (err) {
    httpErrors.internalError(err.message);
  }
}

module.exports.getUsers = async (_, args, { User }) => {
  try {
    const users = await User.find({});
    return users;
  } catch(err) {
    httpErrors.internalError(err.message);
  }
}

module.exports.addUser = async (_, args, { User }) => {
  try {
    const user = await User.find({ email: args.email });
    if (!user) httpErrors.userAlreadyExist();
    const newUser = new User(args);
    const storedUser = await newUser.save();
    return storedUser;
  } catch (err) {
    httpErrors.internalError(err.message);
  }
};

module.exports.updateUser = async (_, { id, name, email }, { User }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name: name, email: email }, { new: true });
    return updatedUser;
  } catch (err) {
    httpErrors.internalError(err.message);
  }
};

module.exports.removeUser = async (_, { id }, { User }) => {
  try {
    if (!validId(id)) httpErrors.invalidId();
    const user = await User.findByIdAndRemove(id);
    if (!user) httpErrors.userNotFound();  
    return { success: true, message: 'Deleted' };
  } catch (err) {
    httpErrors.internalError(err.message);
  }
}
