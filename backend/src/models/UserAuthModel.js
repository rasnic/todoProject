const mongoose = require('mongoose');

const UserAuthSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  last_activity: {
    type: Date,
  },
});

const UserAuthModel = mongoose.model('Auth', UserAuthSchema);

module.exports = UserAuthModel;
