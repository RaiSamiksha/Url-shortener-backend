'use strict';

const fs = require('fs');
require('mysql2');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Determine environment
console.log(`Running in ${env} mode`);

const db = {}; // Initialize an empty object to hold models

// Create a new Sequelize instance using environment variables directly
const sequelize = new Sequelize(
  process.env.PROD_DB_DATABASE,       
  process.env.PROD_DB_USERNAME,       
  process.env.PROD_DB_PASSWORD,       
  {
    host: process.env.PROD_DB_HOST,    
    port: process.env.PROD_DB_PORT,   
    dialect: process.env.PROD_DB_DIALECT || 'mysql', // Dialect (default to MySQL)
    logging: false                     // Disable logging (optional)
  }
);

// Read all the model files in the current directory (excluding index.js)
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add each model to the db object
  });

// If a model has an associate function, call it to define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// Synchronize models in the correct order
(async () => {
  try {
    await sequelize.authenticate();  // This checks if Sequelize can connect to your database
    console.log('Database connection has been established successfully.');
    await db.User.sync();  // Ensure the 'users' table is created
    await db.Url.sync();   // Then create the 'urls' table
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error synchronizing models:", err);
  }
})();
