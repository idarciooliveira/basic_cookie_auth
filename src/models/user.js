const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

user.pre('save', function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model('user', user);
