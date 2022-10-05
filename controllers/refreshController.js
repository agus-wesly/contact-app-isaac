const jwt = require("jsonwebtoken");

const User = require("../model/User.js");

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(403);
  }
  const refreshToken = cookies.jwt;
  const dataUser = await User.findOne({refreshToken});
  if (!dataUser) return res.sendStatus(401);

  //Check Refresh Token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || dataUser.username !== decoded.username) return res.sendStatus(403);
    const roles = Object.values(dataUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: dataUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.json({  accessToken });
  });
};

module.exports = handleRefresh;
