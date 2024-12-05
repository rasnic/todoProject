const TaskModel = require('../models/TaskModel');

module.exports = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      task[key] = req.body[key];
    }
  }
  await task.save();
  res.json(task);
};
