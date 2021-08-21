const express = require('express');
const ordersRoute = require('./orders.route');
const routes = express.Router();

routes.use('/orders', ordersRoute);

module.exports = routes;
