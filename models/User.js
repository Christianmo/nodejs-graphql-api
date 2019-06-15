const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, saltRounds).then((hash) => {
    this.password = hash;
    console.log('password', this.password)
    next();
  })
})

module.exports = mongoose.model('User', UserSchema);