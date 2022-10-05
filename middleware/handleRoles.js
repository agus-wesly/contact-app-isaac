const handleRoles = (...rolesGranted) => {
  return (req, res, next) => {
    const rolesWhiteList = [...rolesGranted];
    const userRole = req.roles;
    const match = userRole.map((role) => rolesWhiteList.includes(role)).find((val) => val === true);
    if (!match) return res.sendStatus(403);
    next();
  };
};

module.exports = handleRoles;
