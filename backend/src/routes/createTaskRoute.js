const TaskModel = require('../models/TaskModel');
const ActivityLogModel = require('../models/ActivityLogModel');
const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const task = new TaskModel(req.body);
  const newTask = await task.save();
  const date = new Date();
  const activityLog = new ActivityLogModel({
    object_id: newTask._id,
    user: req.headers.user,
    change_type: 1,
    change: { from: null, to: newTask },
    date,
  });
  const user = await UserAuthModel.findById(req.headers.user);
  user.last_activity = date;
  await user.save();
  await activityLog.save();
  res.json(newTask);
};
