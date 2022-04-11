require("dotenv").config();

const config = {
  PORT: process.env.PORT_SERVER || 3000,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenAlgorithm: process.env.TOKEN_ALGORITHM,
  secretSalt: Number(process.env.SECRET_SALT),
  redis: {
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
  },
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: "mysql",
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
  development: {
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: "mysql",
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
  production: {
    host: process.env.DATABASE_HOST || "localhost",
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: "mysql",
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

module.exports = config;
