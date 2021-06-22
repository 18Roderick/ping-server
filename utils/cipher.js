const { createHmac } = require("crypto");

let cipher = module.exports;

cipher.encrypt = function (str) {
  return createHmac("sha256", str).digest("hex");
};

cipher.compare = function (str, str2) {
  if (typeof str !== "string" || typeof str2 !== "string") {
    throw new Error("Las parámetros no pueden estar vacíos");
  }

  str = cipher.encrypt(str);
  str2 = cipher.encrypt(str2);

  return str === str2;
};
