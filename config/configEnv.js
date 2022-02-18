require("dotenv").config();
module.exports = {
  PORT: process.env.PORT_SERVER || 3000,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenAlgorithm: process.env.TOKEN_ALGORITHM,
  secretSalt: Number(process.env.SECRET_SALT),
  redis: {
    REDIS_PORT: process.env.REDIS_PORT,
  },
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000,
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    },
  },
};
