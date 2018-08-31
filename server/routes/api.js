
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

function routesValidate(req,auth) {
  switch(req.url.split('?')[0].split('/')[1]) {
    case('instance') :
      // If user is admin, or owns the instance and is not doing a POST or DELETE request on anything else than 'attribute/backup'
      return auth.admin || (req.url.split('?')[0].split('/')[2]==undefined || auth.instances.includes(req.url.split('?')[0].split('/')[2])) && (req.method!='POST' && req.method!='DELETE' || req.url.split('?')[0].split('/')[3]=='attribute' && req.url.split('?')[0].split('/')[4]=='backup');
    break;
    case('rundeck') :
      // If user is admin, or owns the instance
      return auth.admin || auth.instances.includes(req.url.split('?')[0].split('/')[4]);
    break;
    // Additionnal routes access restriction come here
    default:
      return true;
  } 
}

function validate(req, filter) {
    console.log("ACL: Validating request")
    console.log("URL: " + req.url);
    console.log("Headers: " + JSON.stringify(req.headers, null, 2));
    console.log("Params: " + JSON.stringify(req.params, null, 2));
    console.log("Body: " + JSON.stringify(req.body, null, 2));
    console.log("SessionID: " + JSON.stringify(req.session.id, null, 2));
    console.log("Session: " + JSON.stringify(req.session, null, 2));
    
    try {
      var auth = jwt.verify(req.headers['jwt-session'], config.secretKey);
      if(routesValidate(req,auth)) {
        return auth;
      }
      else {
        console.trace('Unauthorized');
      }
      // TODO: Implement further ACL validation (url/objects)
    } catch(err) {
        console.trace('JWT Verify error!',err);
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
            delete auth.instances
            console.log('ACL: valid');
            console.log('Auth ', JSON.stringify(auth));
            apiopts = apiOptions;
            apiopts['headers']['auth'] = JSON.stringify(auth);
            console.log("apiopts: " + JSON.stringify(apiopts));
            requestProxy(apiopts)(req, res, next)
        } catch(err) {
            console.log('Proxy error', err);
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
      
      body.owner = username;
      if(body.admin) {
        delete body.instances;
      }
      console.log('>>>> Signing BODY', body)
      var jtoken = jwt.sign(body, config.secretKey)
      resolve(jtoken);
    });

  });

}

module.exports = {
    router: router,
    getToken: getToken
}
