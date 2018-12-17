var config = {}

config.port = process.env.PORT || 3000
config.secretKey = process.env.SECRET_KEY || 'mysecretkey'
config.adminGroup = process.env.ADMIN_EGROUP || 'admin-group'
config.userGroup = process.env.USER_EGROUP || 'user-group'

var apiato = {};

apiato.url = process.env.APIATO_URL || "http://localhost:5443/api/v1/*"
apiato.user = process.env.APIATO_USER || "dummyuser"
apiato.password = process.env.APIATO_PASSWORD || "dummypassword"
apiato.host = apiato.url.split('/')[2].split(':')[0];
apiato.port = apiato.url.split(':')[2].split('/')[0];
apiato.path = apiato.url.split(apiato.host+':'+apiato.port)[1];
apiato.ACL = {};

config.apiato = apiato;

var oauth = {}

oauth.client_id= process.env.OAUTH_CLIENT_ID || 'client_id'
oauth.secret = process.env.OAUTH_SECRET || 'secret'
oauth.tokenHost= process.env.OAUTH_TOKEN_HOST || 'https://oauth.host.dom'
oauth.tokenPath= '/OAuth/Token'
oauth.authorizePath= '/OAuth/Authorize'
oauth.redirect_uri = process.env.OAUTH_REDIRECT_URI || 'host:port/path/to/callback'
oauth.scope = 'read'
oauth.state = '3(#0/!~'
oauth.resourceHost = process.env.OAUTH_RESOURCE_HOST || 'oauthresource.dom'
oauth.resourcePathGroups = '/api/Groups'
oauth.resourcePathUser = '/api/User'

config.oauth = oauth

var elasticsearch ={}

elasticsearch.user= process.env.ES_USER || 'itdb'
elasticsearch.password= process.env.ES_PASSWORD || 'secret'
elasticsearch.host= process.env.ES_HOST || 'https://es-itdb.cern.ch:9203'
var indexNames ={}
indexNames.mylog='itdb_dbod-mylog-*'
indexNames.myslowlog='itdb_dbod-myslowlog-*'
indexNames.inflog='itdb_dbod-inflog-*'
indexNames.pglog='itdb_dbod-pglog-*'
elasticsearch.indexNames = indexNames

config.elasticsearch = elasticsearch

var parameters = {}

parameters.max_user_connections = '300'
parameters['server-id'] = '1'
parameters.performance_schema = 'on'

config.parameters = parameters

module.exports = config
