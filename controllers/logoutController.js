const User = require("../model/User.js");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  //Find User
  const currentUser = await User.findOne({ refreshToken }).exec();
  if (!currentUser) return res.status(204);

  //Filter User and remove the refreshToken
  currentUser.refreshToken = "";
  const response = await currentUser.save();
  res.sendStatus(204);
};

module.exports = handleLogout;
