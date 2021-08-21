const models = require('../../../models')
const Constants = require('../lib/Constants');
const sequelize = models.sequelize;
const config = require('../../../api.json')
const { v4: uuidv4 } = require('uuid');

let date = new Date();

const addOrder = (data, callback) =>{
    /**
     * items = [{itemId:1 ,quantity: 1, note: ''},{itemId:2 ,quantity: 1, note: ''}]
     */
    
    try {
        const {items, customerId, orderType} = data;
        /**
         * Create database transaction
         */
        const transaction = await sequelize.transaction();

        const createdOrder = await models.Order.create(
            {customerId, orderType},
            transaction
        );

        const orderItems = items.map((item)=>{
            return  {
                ...item,
                orderId: createdOrder.id
            }  
        });

        const createOrderItems = await models.OrderItem.bulkCreate(orderItems, transaction);

        callback({statusCode: Constants.errorStatus.CREATED, body: createdOrder});

    } catch (error) {
        callback({statusCode: Constants.errorStatus.SERVER_ERROR, body: 'Server Error: ErrorCode 101'});
    }


}

const getOrders = (data, callback) =>{
    
}

module.exports = {
    addOrder,
    getOrders,
}