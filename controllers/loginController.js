const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.sendStatus(400);
  const dataUser = await User.findOne({ username: user }).exec();
  if (!dataUser) return res.status(401).json({ message: "Username or Password incorrect !" });

  //Check Password
  const match = await bcrypt.compare(pwd, dataUser.password);
  if (!match) return res.sendStatus(403);
  const roles = Object.values(dataUser.roles).filter(Boolean);
  //JWT
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
  const refreshToken = jwt.sign({ username: dataUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });

  //Saving refreshToken to database
  const updatedUser = await User.updateOne({ username: dataUser.username }, { $set: { refreshToken: refreshToken } }).exec();
  res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
  res.json({ accessToken });
};

module.exports = { handleLogin };
