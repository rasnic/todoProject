const TaskModel = require('../models/TaskModel');

module.exports = async (req, res) => {
  const { id } = req.params;
  const todo = await TaskModel.findById(id);
  if (!todo) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await TaskModel.deleteOne({ _id: id });
  res.status(204).json(todo);
};
