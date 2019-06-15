const httpErrors = require('../utils/httpErrors');
const { validId } = require('../utils/validations');

module.exports.getPage = async (_, { id }, { Page }) => {
  try {
    if (!validId(id)) httpErrors.invalidId();
    const Page = await Page.findById(id);
    if (!Page) httpErrors.PageAlreadyExist();
    return Page;
  } catch (err) {
    httpErrors.internalError(err.message);
  }
}

module.exports.getPages = async (_, args, { Page }) => {
  try {
    const Pages = await Page.find({});
    return Pages;
  } catch(err) {
    httpErrors.internalError(err.message);
  }
}

module.exports.addPage = async (_, args, { Page, me }) => {
  console.log(me);
  try {
    const Page = await Page.find({ title: args.title });
    if (!Page) httpErrors.PageAlreadyExist();
    const newPage = new Page(args);
    const storedPage = await newPage.save();
    return storedPage;
  } catch (err) {
    httpErrors.internalError(err.message);
  }
};

module.exports.updatePage = async (_, { id, name, email }, { Page }) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(id, { name: name, email: email }, { new: true });
    return updatedPage;
  } catch (err) {
    httpErrors.internalError(err.message);
  }
};

module.exports.removePage = async (_, { id }, { Page }) => {
  try {
    if (!validId(id)) httpErrors.invalidId();
    const Page = await Page.findByIdAndRemove(id);
    if (!Page) httpErrors.PageNotFound();  
    return { success: true, message: 'Deleted' };
  } catch (err) {
    httpErrors.internalError(err.message);
  }
}