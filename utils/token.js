const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const config = require("../config/configEnv");

 // keys privados del token
const PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, "./../config/privateTokenKey.key"),
  "utf8"
);

//keys públicos del token
const PUBLIC_KEY = fs.readFileSync(
  path.join(__dirname, "./../config/publicTokenKey.key"),
  "utf8"
); 

//configuración de
const refreshTokenIat = "30d";
const temporalTokenIat = "1h";

let token = module.exports;

const tokenConfig = {
  issuer: "Pingdom Copy",
  expiresIn: "1h",
  algorithm: config.tokenAlgorithm,
  audience: "Client_Identity",
};

token.sign = function (payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    ...tokenConfig,
    expiresIn: temporalTokenIat,
  });
};

token.signRefreshToken = function (payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    ...tokenConfig,
    expiresIn: refreshTokenIat,
  });
};

token.verify = function (strToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(strToken, PUBLIC_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

