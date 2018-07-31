
// Load configuration
var config = require('../../server/config');

const express = require('express');
const router = express.Router();

var requestProxy = require('express-request-proxy');

var usernamePassword = config.apiato.user + ":" + config.apiato.password;

const apiOptions = {
    url: config.apiato.url + "/*",
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
    console.log("Session: " + JSON.stringify(req.session, null, 2)); 
    // TODO: Implement ACL validation 
    if (req.session.isAuthenticated) return true;
    else return false;
}

// TODO: Proper error handling

function myProxy(acl, apiOptions) {
    return function(req, res, next) {
        if (validate(req, acl) == true) {
            console.log('ACL: valid');
            apiopts = apiOptions;
            var auth = {};
            auth.owner = req.session.user.username;
            auth.admin = req.session.isAdmin || false ;
            // auth.admin = true;
            auth.groups = req.session.groups || {} ;
            apiopts['headers']['auth'] = JSON.stringify(auth);
            console.log("apiopts: " + JSON.stringify(apiopts));
            requestProxy(apiopts)(req, res, next)
        } else {
            console.log('ACL: invalid');
            res.statusCode = 403; // Forbidden access
            res.end();
        }
    }
}

router.all('/*', myProxy(ACL, apiOptions));

function getToken(username, groups) {
    const jwt = require('jsonwebtoken')
    var jtoken = jwt.sign("test", config.secretKey)
    return jtoken
}

module.exports = {
    router: router,
    getToken: getToken
}