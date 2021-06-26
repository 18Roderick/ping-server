require("dotenv").config();
module.exports = {
  PORT: process.env.PORT_SERVER || 3000,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenAlgorithm: process.env.TOKEN_ALGORITHM,
  secretSalt: Number(process.env.SECRET_SALT),
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_DIALECT
   
  },
};
