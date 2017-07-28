var config = {}

config.port = process.env.PORT || 3000
config.secretKey = 'mysecretkey'
config.adminGroup = 'group'

var apiato = {};

apiato.url = "http://localhost:5443/api/v1/*"
apiato.user = "dummyuser"
apiato.password = "dummypassword"
apiato.ACL = {}

config.apiato = apiato;

var oauth = {}
  
oauth.client_id= 'client_id'
oauth.secret = 'secret'
oauth.tokenHost= 'https://oauth.host.dom'
oauth.tokenPath= '/OAuth/Token'
oauth.authorizePath= '/OAuth/Authorize'
oauth.redirect_uri = process.env.OAUTH_REDIRECT_URI || 'host:port/path/to/callback'
oauth.scope = 'read'
oauth.state = '3(#0/!~'
oauth.resourceHost = 'oauthresource.dom'
oauth.resourcePathGroups = '/api/Groups'
oauth.resourcePathUser = '/api/User'

config.oauth = oauth

module.exports = config
