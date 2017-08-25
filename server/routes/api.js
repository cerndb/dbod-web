
// Load configuration
var config = require('../../server/config');

const express = require('express');
const router = express.Router();

var requestProxy = require('express-request-proxy');

var usernamePassword = config.apiato.user + ":" + config.apiato.password;

const apiOptions = {
    url: config.apiato.url,
    headers: {
        Authorization: "Basic " + new Buffer(usernamePassword).toString('base64')
    }
}

const ACL = config.apiato.ACL

function validate(req, filter) {
    console.log("ACL: Validating request")
    console.log("URL: " + req.url);
    console.log("Headers: " + JSON.stringify(req.headers, null, 2));
    console.log("Params: " + JSON.stringify(req.params, null, 2));
    console.log("Body: " + JSON.stringify(req.body, null, 2));
    // TODO: Implement ACL validation 
    return true;
}

// TODO: Proper error handling

function myProxy(acl, apiOptions) {
    f = requestProxy(apiOptions) // f(req, res, next)
    return function(req, res, next) {
        // Get authentication data
        if (! req.session.isAuthenticated) {
            res.redirect('/login');
        }
        // Get session information
        userdata = {}
        userdata.isAdmin = req.session.isAdmin
        userdata.isAuthenticated = req.session.isAuthenticated
        userdata.username = req.session.user.username
        console.log("UserData: " + JSON.stringify(userdata, null, 2))
        // Set auth headers
        req.headers['auth'] = JSON.stringify(userdata, null, 2);
        
        if (validate(req, acl) == true) {
            console.log('ACL: valid');
            f(req, res, next)
        } else {
            console.log('ACL: invalid');
            res.statusCode = 403; // Forbidden access
            res.end();
        }
    }
}

router.get('/*', myProxy(ACL, apiOptions));
router.post('/*', myProxy(ACL, apiOptions));
router.put('/*', myProxy(ACL, apiOptions));
router.delete('/*', myProxy(ACL, apiOptions));

function getToken(username, groups) {
    const jwt = require('jsonwebtoken')
    var jtoken = jwt.sign("test", config.secretKey)
    return jtoken
}

module.exports = {
    router: router,
    getToken: getToken
}
