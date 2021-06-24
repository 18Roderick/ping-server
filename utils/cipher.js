const bcrypt = require("bcrypt");
const config = require("../config/configEnv");

let cipher = module.exports;


cipher.encrypt = function (str) {
  return bcrypt.hash(str, config.secretSalt);
};

cipher.compare = function (str, password) {
  return bcrypt.compare(str, password);
};

