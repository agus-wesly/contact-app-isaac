const jwt = require("jsonwebtoken");

const handleAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization || req.headers.Authorization;
  if (!accessToken?.includes("Bearer ")) return res.sendStatus(401);
  const token = accessToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.sendStatus(403);
    }
    req.user = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
};

module.exports = handleAccessToken;
