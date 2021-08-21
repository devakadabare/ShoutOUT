'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      assignTo: {
        type: Sequelize.INTEGER
      },
      orderType: {
        type: Sequelize.ENUM,
        values: ['ONLINE','DINEIN', 'UBER','PICKME'],
        defaultValue: 'DINEIN'
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ORDER_ACCEPTED','ORDER_REJECTED', 'PROCESSING','COMPLETED','DELETED'],
        defaultValue: 'ORDER_ACCEPTED'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};