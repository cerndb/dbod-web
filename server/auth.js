
// Load configuration
var config = require('./config');

// Load api
const api = require('./routes/api');

// OAUTH
const simpleOauth = require('simple-oauth2');
const oauth2 = simpleOauth.create({
  client: {
    id: config.oauth.client_id,
    secret: config.oauth.secret,
  },
  auth: {
    tokenHost: config.oauth.tokenHost,
    tokenPath: config.oauth.tokenPath,
    authorizePath: config.oauth.authorizePath,
  },
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.oauth.redirect_uri,
    scope : config.oauth.scope,
    state: config.oauth.state,
});

function genApiatoToken(session, token, res) {
	
    var https = require('https');
	console.log('access_token: ', token.token.access_token)

	var options = {
	  host: config.oauth.resourceHost,
	  path: config.oauth.resourcePathGroups,
      headers: {
		'Authorization': `Bearer ${token.token.access_token}`
      },
	};

	https.request(options, (response) => {
		  var str = ''
		  response.on('data', function (chunk) {
			str += chunk;
		  });
		  response.on('end', function () {
			console.log(str)
            var groups = JSON.parse(str).groups
            if (groups.indexOf(config.adminGroup) >= 0) {
              // If the user is member of the admin e-group
              session.isAdmin = true
            }

            session.token = api.getToken('username', groups)
            // Fetch User info
            console.log('Accesing User Info');
            options.path = config.oauth.resourcePathUser

            https.request(options, (response) => {
                var str = ''
                response.on('data', function (chunk) {
                  str += chunk;
                });
                response.on('end', function () {
                    console.log('User Info: ' + str);
                    session.user = JSON.parse(str)
                    session.isAuthenticated = true
	    		    res.redirect('/')
                })
            }).end();
		  });
	}
	).end();
}

function callback(req, res) {
  const code = req.query.code;
  const options = {
    code: code,
    redirect_uri: config.oauth.redirect_uri,
  };

  console.log("Code: ", code);

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      console.log(error)
      return res.json('Authentication failed');
    }

    const token = oauth2.accessToken.create(result);
    return genApiatoToken(req.session, token, res);
  });
}

module.exports = {
    authUri: authorizationUri,
    callback: callback
}

