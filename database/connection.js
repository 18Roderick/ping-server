const mysql = require("mysql2");

const { database } = require("../config/configEnv");

const connection = mysql.createConnection({
  host: database.databaseHost,
  user: database.databaseUser,
  database: database.databaseName,
});



module.exports = connection;
