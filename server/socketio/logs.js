exports = module.exports = function(io,config,client){
  io.of('/logs').on('connection', function(socket) {
    // console.log('socket.io connection made');
    var dataLogs;
    var jsonHitsPrec = '';
    var monitoringTimeout=0;

    var monitor = function() {
      //console.log(dataLogs);
      client.search({
        index: config.elasticsearch.indexNames[dataLogs.logType],
        body: {
          query: {
            term: { instance: dataLogs.name }
          },
          "from": dataLogs.from,
          "size": dataLogs.size,
          "sort": [
          { "@timestamp": { "order": "desc" } },
          { "offset": { "order": "desc" } }
          ]
        }
      }).then(function (resp) {
        var hits = resp.hits.hits.map(res => res._source);
        jsonHits = JSON.stringify(hits);
        if(jsonHits!=jsonHitsPrec) {
          jsonHitsPrec = jsonHits;

          client.count({
            index: config.elasticsearch.indexNames[dataLogs.logType],
            body: {
              query: {
                term: { instance: dataLogs.name }
              }
            }
          }).then(function (resp) {
            //console.log(jsonHits);
            socket.emit('countlogs', JSON.stringify(resp));
            socket.emit('logs', jsonHits);
          }, function (err) {
            console.trace(err.message);
          });
        }
      }, function (err) {
        console.trace(err.message);
      });
      monitoringTimeout = setTimeout(monitor, 500); // Choose the refresh time
    }

    socket.on('getter', (data) => {
      dataLogs = data;
      jsonHitsPrec = '';
      clearTimeout(monitoringTimeout);
      monitor();
    });

    socket.on('disconnect', (reason) => {
      monitor = function() {
        return null;
      };
    });
  });
}