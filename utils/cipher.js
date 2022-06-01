const argon = require("argon2");

let cipher = module.exports;

cipher.encrypt = function (str) {
  return argon.hash(str);
};

cipher.compare = function (str, password) {
  return argon.verify(password, str);
};
