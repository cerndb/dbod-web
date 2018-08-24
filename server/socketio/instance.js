exports = module.exports = function(io,config,client){
  const http = require('http');

  io.of('/instance').on('connection', function(socket) {
    // console.log('socket.io connection made');
    var strInstancePrec = '';
    var monitoringTimeout=0;

    var usernamePassword = config.apiato.user + ":" + config.apiato.password;

    var monitor = function(dataInstance) {
      http.get({ host: 'localhost', path: config.apiato.path+'/instance/'+dataInstance.name, port:config.port, headers : {"jwt-session": dataInstance.hasOwnProperty('jwt') ? dataInstance.jwt : null} }, (resp) => {
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
      monitoringTimeout = setTimeout(monitor, 10000, dataInstance); // Choose the refresh time
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