exports = module.exports = function(io,config,client){
  const https = require('https');

  io.of('/jobs').on('connection', function(socket) {
    // console.log('socket.io connection made');
    var strJobsPrec = '';
    var monitoringTimeout=0;

    var usernamePassword = config.apiato.user + ":" + config.apiato.password;

    var monitor = function(dataJobs) {
      https.get({ host: config.apiato.host, path: config.apiato.path+'/instance/'+dataJobs.id+'/job?order=creation_date.desc&size='+dataJobs.size+'&from='+dataJobs.from, port:config.apiato.port, headers: { Authorization: "Basic " + new Buffer(usernamePassword).toString('base64') } }, (resp) => {
        var strJobs = '';
        resp.on('data', function (chunk) {
          strJobs += chunk;
        });
        resp.on('end', function () {
          try { 
            var jobs = JSON.parse(strJobs);
            // console.log(jobs);
            if(strJobs!=strJobsPrec) {
              strJobsPrec = strJobs;
              socket.emit('countjobs', jobs.meta.total);
              socket.emit('jobs', JSON.stringify(jobs.response));
            }
          } catch(err) {
              console.log(err);
          }
        });
      }).on('error', (err) => {
        console.trace(err.message);
      });
      monitoringTimeout = setTimeout(monitor, 1000, dataJobs); // Choose the refresh time
    }

    socket.on('getter', (dataJobs) => {
      strJobsPrec = '';
      clearTimeout(monitoringTimeout);
      monitor(dataJobs);
    });

    socket.on('disconnect', (reason) => {
      monitor = function() {
        return null;
      };
    });
  });
}