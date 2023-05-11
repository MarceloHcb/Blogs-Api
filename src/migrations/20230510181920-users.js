'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('users', {
      id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      display_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email:{
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image:{
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING        
      },
      });    
  },

  down: async (queryInterface, Sequelize) => {   
      await queryInterface.dropTable('users');    
  }
};
