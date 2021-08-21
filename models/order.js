'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    assignTo: {
      type: DataTypes.INTEGER
    },
    orderType: {
      type: DataTypes.ENUM,
      values: ['ONLINE','DINEIN', 'UBER','PICKME'],
      defaultValue: 'DINEIN'
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ORDER_ACCEPTED','ORDER_REJECTED', 'PROCESSING','COMPLETED','DELETED'],
      defaultValue: 'ORDER_ACCEPTED'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};