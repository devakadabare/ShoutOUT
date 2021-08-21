const express = require('express');
const ordersController = require('../controllers/orders');
const ordersService = require('../services/orders');

const routes = express.Router();

routes.post('/', function (req, res) {
    ordersController.addCustomer(req.body,function (result) {
        res.status(result.statusCode).send(JSON.stringify(result.body));
    })
});

routes.get('/', function (req, res) {
    ordersService.getOrders(req.body,function (result) {
        res.status(result.statusCode).send(JSON.stringify(result.body));
    })
});
module.exports = routes;