const jwt = require('jsonwebtoken');
const config = require('../../../api.json');
const Constants = require('../lib/Constants');
import models from '../../../models';
const logger = require('../lib/Winston');
import {
    setUserAgent, setVendorId
} from '../util/Store.utils';


let date = new Date();
let secretKey = config.env.AUTHORIZATION.jwt_secret;

module.exports = (req, res, next) => {

    try {
        let token = req.headers['x-auth']; // Express headers are auto converted to lowercase
        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.split(" ")[1];
                const vendorId = req.headers['vendor_id']; // get request vendorId
                let tokenVendorId = jwt.verify(token, secretKey); // validate jwt token
                if (tokenVendorId) {
                    if (vendorId == tokenVendorId.id) {
                        models.Vendor.findOne({ where: { id: vendorId } }).then(function (result) {
                            if(result)
                            {
                                if (result.token === token){
                                    setUserAgent(req.headers['x-user-agent'],function (params) {
                                        console.log(params);
                                    });
                                    setVendorId(req.headers['vendor_id'],function (params) {
                                        console.log(params);
                                    })
                                    
                                    next();
                                }else {
                                    logger.log({ level: 'warn', message: { user: req.headers['vendor_id'] || tokenVendorId, request: req.body, response: { error: 'Authenication Failed up' }, reason: 'Vendor ID is not Matching', date: date } });
                                    return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//'unauthorized user'
                                }
                            } else {
                                logger.log({ level: 'warn', message: { user: req.headers['vendor_id'] || tokenVendorId, request: req.body, response: { error: 'Authenication Failed up' }, reason: 'No user found for specific vendor id', date: date } });
                                return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//user not found
                            }
                        }).catch(error => {
                            logger.log({ level: 'warn', message: { user: req.headers['vendor_id'] || tokenVendorId, request: req.body, response: { error: error }, reason: 'error occured', date: date } });
                            return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//something went wrong while fetching authorized vendor
                        })
                    } else {
                        logger.log({ level: 'warn', message: { user: req.headers['vendor_id'] || tokenVendorId, request: req.body, response: { error: 'Authenication Failed up' }, reason: 'Vendor ID is not Matching with headers token', date: date } });
                        return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//Unauthorized
                    }
                }
                else {
                    logger.log({ level: 'error', message: { user: req.headers['vendor_id'], request: req.body, response: { error: 'Authenication Failed down' }, reason: 'Token not found', date: date } });
                    return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//Invalid token
                }
            } else {
                logger.log({ level: 'error', message: { user: req.headers['vendor_id'], request: req.body, response: { error: 'Authenication Failed down' }, reason: 'invalid token structure', date: date } });
                return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//Invalid token
            }
        } else {
            logger.log({ level: 'error', message: { user: req.headers['vendor_id'], request: req.body, response: { error: 'Authenication Failed down' }, reason: JSON.stringify(error), date: date } });
            return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//Token not found
        }

    } catch (error) {
        logger.log({ level: 'error', message: { user: req.headers['vendor_id'], request: req.body, response: { error: 'Authenication Failed down' }, reason: JSON.stringify(error), date: date } });
        return res.status(Constants.errorStatus.UNAUTHORIZED).send(JSON.stringify(Constants.responseErrorMessage.UNAUTHORIZED));//Not Authenticated
    }
};