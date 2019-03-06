'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(126).BINARY,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(126).BINARY,
      unique: true,
    },
    apikey: {
      allowNull: false,
      type: DataTypes.STRING(126).BINARY,
      unique: true,
    },
    isActive: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(126).BINARY,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('Users');
  }
};
