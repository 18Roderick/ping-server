const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const config = require("../config/configEnv");

//configuración de
const refreshTokenIat = "30d";
const temporalTokenIat = "8h";

let token = module.exports;

const tokenConfig = {
  issuer: "Pingdom Copy",
  expiresIn: "1h",
  algorithm: config.tokenAlgorithm,
  audience: "Client_Identity",
};

token.sign = function (payload) {
  return jwt.sign(payload, config.tokenSecret, {
    ...tokenConfig,
    expiresIn: temporalTokenIat,
  });
};

token.signRefreshToken = function (payload) {
  return jwt.sign(payload, config.tokenSecret, {
    ...tokenConfig,
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
