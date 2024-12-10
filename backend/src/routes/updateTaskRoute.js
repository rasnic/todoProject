const TaskModel = require('../models/TaskModel');
const ActivityLogModel = require('../models/ActivityLogModel');
const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  const date = new Date();
  const activityLogChange = {
    object_id: id,
    user: req.headers.user,
    change_type: 2,
    change: { from: {}, to: req.body },
    date,
  };
  if (!task) {
    return res.status(404).send('Task not found');
  }
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      activityLogChange.from = { ...activityLogChange.from, [key]: task[key] };
      task[key] = req.body[key];
    }
  }
  const activityLog = new ActivityLogModel(activityLogChange);
  await task.save();
  await activityLog.save();
  const user = await UserAuthModel.findById(req.headers.user);

  user.last_activity = date;
  await user.save();
  res.json(task);
};
