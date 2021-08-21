const ordersService = require('../services/orders');
const Constants = require('../lib/Constants');

let date = new Date();

const addOrder = (data, callback) => {

    ordersService.addOrder(data, function (result) {
        callback(result);
    });
    
}

const getOrders = (data, callback) => {

    ordersService.getOrders(data, function (result) {
        callback(result);
    });
    
}

module.exports = {
    addOrder,
    getOrders
};