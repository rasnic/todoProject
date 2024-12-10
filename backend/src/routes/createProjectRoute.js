const ProjectModel = require('../models/ProjectModel');
const ActivityLogModel = require('../models/ActivityLogModel');
const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const project = new ProjectModel(req.body);
  const newProject = await project.save();
  const date = new Date();
  const activityLog = new ActivityLogModel({
    object_id: newProject._id,
    user: req.headers.user,
    change_type: 4,
    change: { from: null, to: newProject },
    date,
  });
  const user = await UserAuthModel.findById(req.headers.user);
  user.last_activity = date;
  await user.save();
  await activityLog.save();
  res.json(newProject);
};
