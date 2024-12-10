const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  object_id: {
    type: String,
  },
  change: {
    type: Object,
  },
  change_type: {
    type: Number,
  },
  user: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const ActivityModel = mongoose.model('activity', ActivitySchema);

module.exports = ActivityModel;
