module.exports = {
  PORT: process.env.PORT_SERVER || 3000,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_ALGORITHM: process.env.TOKEN_ALGORITHM,
  DATABASE: {
    DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
  },
};
