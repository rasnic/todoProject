const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  priority: {
    type: Number,
  },
  due_date: {//
    type: Date,
  },
  assignee: {//
    type: String,
  },
  created_by: {
    type: String,
  },
  task_dependency: {
    type: Array,
  },
  project: {
    type: String,
  },
});

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;
