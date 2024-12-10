const TaskModel = require('../models/TaskModel');
const ProjectModel = require('../models/ProjectModel');
const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const users = await UserAuthModel.find();
  const user = users.find((u) => u._id.toString() === req.headers.user);
  let { password, ...userActive } = user.toObject();
  const usersWithoutPassword = users
    .filter((u) => u.email !== user.email)
    .map((us) => {
      const { password, __v, ...userWithoutPassword } = us.toObject();
      return userWithoutPassword;
    });
  const tasks = await TaskModel.find();
  const projects = await ProjectModel.find();
  const time = new Date();
  user.last_activity = time;
  await user.save();
  res.json({
    users: [userActive, ...usersWithoutPassword],
    tasks,
    projects,
  });
};
