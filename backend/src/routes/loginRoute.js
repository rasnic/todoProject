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
    const time = new Date();
    userExists.last_activity = time;
    await userExists.save();
    res.json({
      token,
      user_id: userExists._id,
    });
  } else {
    res.status(401).send('Wrong sign in credentials');
  }
};
