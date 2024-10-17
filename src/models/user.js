"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      // Example: User.hasMany(models.Url);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validate email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // It can be null if you don't require a password at creation
      },
      role: {
        type: DataTypes.ENUM("admin", "user"), // Role must be either 'admin' or 'user'
        allowNull: false,
        defaultValue: "user", // Default role is 'user'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set creation time
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set updated time
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // Enables automatic timestamps for createdAt and updatedAt
    }
  );

  return User;
};
