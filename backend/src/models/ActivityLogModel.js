const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  change: {
    type: Object,
  },
  change_type: {
    type: Number,
  },
  changed_by: {
    type: String,
  },
  change_time: {
    type: Date,
  },
});

const ActivityModel = mongoose.model('activity', ActivitySchema);

module.exports = ActivityModel;