const UserAuthModel = require('../models/UserAuthModel');
const ActivityLogModel = require('../models/ActivityLogModel');
module.exports = async (req, res) => {
  const activityLogs = await ActivityLogModel.find();
  const users = await UserAuthModel.find();
  const user = users.find((u) => u._id.toString() === req.headers.user);
  const time = new Date();
  user.last_activity = time;
  await user.save();
  res.json({
    activityLogs,
  });
};
