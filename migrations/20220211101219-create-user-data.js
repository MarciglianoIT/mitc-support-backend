"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserData", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
        references: {
          model: "Users",
          key: "id",
        },
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      addressCountry: {
        type: Sequelize.STRING,
      },
      addressStreet: {
        type: Sequelize.STRING,
      },
      addressZip: {
        type: Sequelize.STRING,
      },
      addressCity: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserData");
  },
};
