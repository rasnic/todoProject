const TaskModel = require('../models/TaskModel');

module.exports = async (req, res) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
};
