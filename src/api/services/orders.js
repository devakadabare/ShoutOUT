const models = require('../../../models')
const Constants = require('../lib/Constants');
const sequelize = models.sequelize;
const config = require('../../../api.json')
const { v4: uuidv4 } = require('uuid');

let date = new Date();

const addOrder = async(data, callback) =>{
    /**
     * items = [{itemId:1 ,quantity: 1, notes: ''},{itemId:2 ,quantity: 1, notes: ''}]
     */
    /**
     * Create database transaction
     */
     const transaction = await sequelize.transaction();
    try {
        const {items, customerId, orderType} = data;
        
        
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
        console.log('================',orderItems)

        const createOrderItems = await models.OrderItem.bulkCreate(orderItems, {transaction});
        console.log('=====createOrderItems===========',createOrderItems)
        await transaction.commit();
        callback({statusCode: Constants.errorStatus.CREATED, body: createdOrder});

    } catch (error) {
        console.log(error)
        await transaction.rollback();
        callback({statusCode: Constants.errorStatus.SERVER_ERROR, body: 'Server Error: ErrorCode 101'});
    }


}

const getOrders = async (data, callback) =>{
    try {
        const {orderType} = data;
        let additinalOrderQuery= '';
        if(orderType){
            additinalOrderQuery = `WHERE orderType = ${orderType}`
        }
        const getOrderQuery = `SELECT * FROM 
                                (SELECT id as orderId, customerId, status as orderStatus, ordertype FROM Orders ${additinalOrderQuery}) as O 
                                JOIN 
                                (SELECT id,firstName, lastName, contact FROM Custmoers) as C 
                                ON O.customerId = C.id`;

        const getOrderData = await sequelize.query(getOrderQuery, {type: sequelize.QueryTypes.SELECT});

        const getOrderItemData = getOrderData.map(async(order) =>{
            let query = `SELECT * FROM 
                            (SELECT itemId,orderId,quantity,note FROM OrderItems WHERE orderId = ${order.orderId}) as OI
                            JOIN 
                            (SELECT id,name, price FROM Items) I
                            ON OI.itemId = I.id`;
            const getOrderItemDataFroSingleOrder = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
            return {...order, items: getOrderItemDataFroSingleOrder};
        });

        const reponse = await Promise.all(getOrderItemData);
        callback({statusCode: Constants.errorStatus.SUCCESS, body: reponse});
    } catch (error) {
        callback({statusCode: Constants.errorStatus.SUCCESS, body: reponse});
    }

}   

module.exports = {
    addOrder,
    getOrders,
}