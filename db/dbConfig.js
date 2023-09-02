const mysql = require("mysql");
require("dotenv").config();

const mysqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
};

const executeQuery = (query, data) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig);

    connection.connect(err => {
      if (err) {
        connection.end();
        return reject(err);
      }

      connection.query(query, data, (err, results) => {
        connection.end();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
};

module.exports = {
  executeQuery,
};
