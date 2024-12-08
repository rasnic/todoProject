const jwt = require('jsonwebtoken');
const UserAuthModel = require('../models/UserAuthModel');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const users = await UserAuthModel.find();
  const userExists = users.find(
    (user) => user.email === email && user.password === password
  );
  if (userExists) {
    const token = jwt.sign(
      {
        userId: userExists._id,
      },
      process.env.SECRET
    );
    let { password, last_activity, __v, ...userActive } = userExists.toObject();
    const usersWithoutPassword = users
      .filter((u) => u.email !== email)
      .map((user) => {
        const { password, __v, ...userWithoutPassword } = user.toObject();
        if (userWithoutPassword.email === email) {
          userActive = userWithoutPassword;
        } else {
          return userWithoutPassword;
        }
      });
    res.json({ token, users: [userActive, ...usersWithoutPassword] });
  } else {
    res.status(401).send('Wrong sign in credentials');
  }
};
