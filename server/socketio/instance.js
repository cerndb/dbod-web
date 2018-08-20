exports = module.exports = function(io,config,client){
  const https = require('https');

  io.of('/instance').on('connection', function(socket) {
    // console.log('socket.io connection made');
    var strInstancePrec = '';
    var monitoringTimeout=0;

    var usernamePassword = config.apiato.user + ":" + config.apiato.password;

    var monitor = function(dataInstance) {
      https.get({ host: config.apiato.host, path: config.apiato.path+'/instance/'+dataInstance.name, port:config.apiato.port, headers: { Authorization: "Basic " + new Buffer(usernamePassword).toString('base64') } }, (resp) => {
        var strInstance = '';
        resp.on('data', function (chunk) {
          strInstance += chunk;
        });
        resp.on('end', function () {
          try { 
            var instance = JSON.parse(strInstance);
            // console.log(instance);
            if(strInstance!=strInstancePrec) {
              strInstancePrec = strInstance;
              socket.emit('instance', JSON.stringify(instance.response[0]));
            }
          } catch(err) {
              console.log(err);
          }
        });
      }).on('error', (err) => {
        console.trace(err.message);
      });
      monitoringTimeout = setTimeout(monitor, 1000, dataInstance); // Choose the refresh time
    }

    socket.on('getter', (dataInstance) => {
      strInstancePrec = '';
      clearTimeout(monitoringTimeout);
      monitor(dataInstance);
    });

    socket.on('disconnect', (reason) => {
      monitor = function() {
        return null;
      };
    });
  });
}