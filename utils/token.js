const jwt = require("jsonwebtoken");

const config = require("../config/configEnv");

const options = { algorithm: config.tokenAlgorithm };

const refreshTokenIat = "30d";
const temporalTokenIat = "1h";

let token = module.exports;

token.sign = function (payload) {
  return jwt.sign(payload, config.tokenSecret, {
    ...options,
    expiresIn: temporalTokenIat,
  });
};

token.signRefreshToken = function (payload) {
  return jwt.sign(payload, config.tokenSecret, {
    ...options,
    expiresIn: refreshTokenIat,
  });
};

token.verify = function (strToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(strToken, config.tokenSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
