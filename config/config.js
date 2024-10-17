require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: "root", 
    password: "root",
    database: "URL_SHORTNER",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "root",
    database: "URL_SHORTNER",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.PROD_DB_DIALECT
  }
};
