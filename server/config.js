var config = {};

config.port = process.env.PORT || 3000;

var apiato = {};

apiato.url = "http://localhost:5443/api/v1/*"
apiato.user = "dummyuser"
apiato.password = "dummypassword"
apiato.ACL = {}

config.apiato = apiato;

module.exports = config;
