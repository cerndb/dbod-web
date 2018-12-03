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
parameters.max_heap_table_size = '32M'
parameters['server-id'] = '1'
parameters['general-log-file'] = '/ORA/dbs03/PINOCHO/mysql/mysql.log'
parameters.max_connections = '1000'
parameters.performance_schema
parameters.innodb_flush_method = 'O_DIRECT'
parameters['innodb-read-io-threads'] = '4'
parameters.innodb_flush_log_at_trx_commit = '1'
parameters['log-slave-updates']
parameters.binlog_format = 'MIXED'
parameters.port = '5500'
parameters.socket = '/var/lib/mysql/mysql.sock.pinocho.5500'
parameters.tmp_table_size = '32M'
parameters.innodb_io_capacity = '200'
parameters.sync_binlog = '1'
parameters.query_cache_size = '128M'
parameters.expire_logs_days = '32'
parameters.innodb_write_io_threads = '4'
parameters.slow_query_log = '1'
parameters.thread_cache_size = '50'
parameters.innodb_open_files = '500'
parameters.table_definition_cache = '1000'
parameters.table_open_cache = '1000'
parameters.key_buffer_size = '256M'
parameters.innodb_file_per_table
parameters.log_output = 'FILE'
parameters.datadir = '/ORA/dbs03/PINOCHO/mysql'
parameters['log-bin'] = '/ORA/dbs02/PINOCHO/mysql/binlog'
parameters.innodb_log_file_size = '16M'
parameters.innodb_buffer_pool_size = '1G'
parameters.max_binlog_size = '1073741824'
parameters.slow_query_log_file = '/ORA/dbs03/PINOCHO/mysql/slow_queries.log'
parameters.max_allowed_packet='64M'
parameters.innodb_checksum_algorithm='innodb'
parameters.binlog_checksum='none'
parameters.query_cache_type='1'
parameters['ssl-cert']='/etc/dbod/certificates/hostcert.pem'
parameters['ssl-ca']='/etc/dbod/certificates/ca.pem'
parameters['ssl-key']='/etc/dbod/certificates/hostkey_mysql.pem'
parameters['ssl-cipher']='DHE-RSA-AES256-SHA:AES128-SHA'

config.parameters = parameters

module.exports = config
