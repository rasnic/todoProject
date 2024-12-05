const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const { email } = req.body;
  const userExists = (await UserAuthModel.find()).filter(
    (user) => user.email === email
  );
  if (userExists.length > 0) {
    return res.status(400).json({ message: 'User with the same email already exists' });
  } else {
    const user = new UserAuthModel({ ...req.body, last_activity: new Date() });
    const newUser = await user.save();
    res.json(newUser);
  }
};
