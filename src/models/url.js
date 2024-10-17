"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Url.init(
    {
      shortId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      redirectUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitHistory: {
        type: DataTypes.TEXT,
        defaultValue: [],
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //   model: "users",
        //   key: "email",
        // },
      },
    },
    {
      sequelize,
      modelName: "Url", // Use singular for consistency with Sequelize conventions
      tableName: "urls", // Adjust the table name if necessary
      timestamps: true, // Automatically create createdAt and updatedAt
    }
  );

  return Url; // Return the Url model
};
