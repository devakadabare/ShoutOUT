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

// describe('Add Order', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

describe('Add Order', async function() {
    describe('#indexOf()', function() {
        it("returns status 200", function(done) {
            // request.post(url,data, function(error, response, body) {
            //     expect(response.statusCode).to.equal(201);
            //     done();
            //   });
            // request.post(url,data, function(error, response, body) {
            //     expect(response.statusCode).to.equal(200);
            //     done();
            //   }))
            ordersService.addOrder(data, function({statusCode, body}) {
                expect(statusCode).to.equal(201);
                 done();
            });
        });
    });
});

