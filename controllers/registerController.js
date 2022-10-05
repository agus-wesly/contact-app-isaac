const bcrypt = require("bcrypt");
const User = require("../model/User.js");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  const duplicateUser = await User.findOne({ username: user }).exec();
  if (duplicateUser) return res.status(409).json({ message: "Username not available !" });

  //hash password
  const hashedPwd = await bcrypt.hash(pwd, 10);
  const newUser = await User.create({
    username: user,
    password: hashedPwd,
  });

  res.status(201).json({ message: `Account with username ${user} successfully created.` });
};

module.exports = handleNewUser;
