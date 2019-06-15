const mongoose = require('mongoose');

const { Schema } = mongoose;

const blockSchema = new Schema({
  type: String,
  value: String,
  index: Number,
});

const pageSchema = new Schema({
  title: String,
  body: String,
  blocks: [blockSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Page', pageSchema);
