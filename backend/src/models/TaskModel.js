const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
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
  sub_tasks: {
    type: Array,
  },
  connected_tasks: {
    type: Array,
  },
  blocked_by_tasks: {
    type: Array,
  },
  blocking_tasks: {
    type: Array,
  },
  project: {
    type: String,
  },
  category: {
    type: String,
  },
  private: {
    type: Number,
  },
  editable: {
    type: Number,
  },
  deletable: {
    type: Number,
  },
});

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;
