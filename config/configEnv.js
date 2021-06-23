module.exports = {
  PORT: process.env.PORT_SERVER || 3000,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenAlgorithm: process.env.TOKEN_ALGORITHM,
  database: {
    databaseHost: process.env.DATABASE_HOST || "localhost",
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_NAME,
  },
};
