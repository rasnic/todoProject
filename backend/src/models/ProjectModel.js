const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  priority: {
    type: Number,
  },
  dueDate: {
    type: Date,
  },
  assignee: {
    type: Array,
  },
  created_by: {
    type: String,
  },
  editable: {
    type: Number,
  },
  deletable: {
    type: Number,
  },
});

const ProjectModel = mongoose.model('task', ProjectSchema);

module.exports = ProjectModel;
