"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Categories");
  },
};
