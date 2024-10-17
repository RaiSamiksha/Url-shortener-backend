'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Use environment from NODE_ENV or default to 'development'
console.log(`node_env${env}`);

// Correct the path to the config file
const config = require(path.join(__dirname, '../../config/config.js'))[env];

const db = {}; // Create an empty object to store the models

let sequelize; // Initialize the sequelize instance

// Check if config has an environment variable for the connection, otherwise use the default values
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });
}

// Read all the files in the current directory (except index.js) and import each model
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add the model to the db object
  });

// Check if any model has an associate function, and if so, call it to establish associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the sequelize instance and Sequelize library
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// Synchronize models in the correct order
(async () => {
  try {
    // Synchronize the `User` model first, then `Url`
    await db.User.sync(); // Ensure the `users` table is created first
    await db.Url.sync();  // Then create the `urls` table
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error synchronizing models:", err);
  }
})();
