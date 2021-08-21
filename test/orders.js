var assert = require('assert');
var request = require("request");
var expect  = require("chai").expect;
const ordersService = require('../src/api/services/orders');
var url = "http://localhost:3000/orders/";

const data = {
    orderType: 'DINEIN',
    customerId: 1,
    items : [{itemId:1 ,quantity: 1, notes: ''},{itemId:2 ,quantity: 1, notes: ''}]
}

describe('Add Order', async function() {

    it("returns status 201", function(done) {
        ordersService.addOrder(data, function({statusCode, body}) {
            expect(statusCode).to.equal(201);
                done();
        });
    });
    
});

describe('get Order', async function() {
    
    it("returns status 200", function(done) {
        ordersService.getOrders({}, function({statusCode, body}) {
            console.log(body)
            expect(statusCode).to.equal(200);
                done();
        });
    });
    
});

