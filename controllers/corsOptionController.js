const whiteList = require("../config/whiteList.js");

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Site not in whitelist !!"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
