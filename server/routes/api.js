
// Load configuration
var config = require('../../server/config');

const express = require('express');
const router = express.Router();

var requestProxy = require('express-request-proxy');

var jwt = require('jsonwebtoken');

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
    console.log("SessionID: " + JSON.stringify(req.session.id, null, 2));
    console.log("Session: " + JSON.stringify(req.session, null, 2));
    
    try {
      return jwt.verify(req.headers['jwt-session'], config.secretKey);
      // TODO: Implement further ACL validation (url/objects)
    } catch(err) {
        console.log(err);
        throw "JWT Verify error!";
    }
}

function myProxy(acl, apiOptions) {
    return function(req, res, next) {
        try {
            auth = validate(req, acl)
            // To be checked against
            delete auth.iat
            // Not supported yet
            delete auth.clusters
            console.log('ACL: valid');
            console.log('Auth ', JSON.stringify(auth));
            apiopts = apiOptions;
            apiopts['headers']['auth'] = JSON.stringify(auth);
            console.log("apiopts: " + JSON.stringify(apiopts));
            requestProxy(apiopts)(req, res, next)
        } catch(err) {
            console.log('ACL: invalid ', err);
            res.statusCode = 403; // Forbidden access
            res.end();
        }
    }
}

router.all('/*', myProxy(ACL, apiOptions));

function getToken(username, groups) {
  
  const request = require('request');
  var url = config.apiato.url + "/auth/resources";
  var bod = {"username": username, "admin": false, "groups": groups};
  var options = {
    uri : url,
    body : bod,
  }

  return new Promise((resolve, reject) => {
    request(url, { json: true, body:bod }, (err, res, body) => {
      if (err) { return console.log(err);
        console.log(err);
        console.log(body.url);
        console.log(body.explanation);
      }
      const jwt = require('jsonwebtoken')
      console.log('>>>> Signing BODY', body)
      delete body.instances
      body.owner = username
      var jtoken = jwt.sign(body, config.secretKey)
      resolve(jtoken);
    });

  });

}

module.exports = {
    router: router,
    getToken: getToken
}
