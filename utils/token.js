const jwt = require("jsonwebtoken");

const config = require("../config/config");

const options = { algorithm: config.TOKEN_ALGORITHM };

const refreshTokenIat = "30d";
const temporalTokenIat = "1h";

let token = module.exports;

token.sign = function (payload) {
  return jwt.sign(payload, config.TOKEN_SECRET, {
    ...options,
    expiresIn: temporalTokenIat,
  });
};

token.signRefreshToken = function (payload) {
  return jwt.sign(payload, config.TOKEN_SECRET, {
    ...options,
    expiresIn: refreshTokenIat,
  });
};

token.verify = function (strToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(strToken, config.TOKEN_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
