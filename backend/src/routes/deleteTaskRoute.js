const TaskModel = require('../models/TaskModel');
const ActivityLogModel = require('../models/ActivityLogModel');
const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const date = new Date();
  const activityLogChange = {
    user: req.headers.user,
    change_type: 3,
    change: { from: { task }, to: null },
    date,
  };
  const activityLog = new ActivityLogModel(activityLogChange);
  await activityLog.save();
  const userActive = await UserAuthModel.findById(req.headers.user);
  userActive.last_activity = date;
  await userActive.save();
  await TaskModel.deleteOne({ _id: id });
  res.status(204).json(task);
};
