exports = module.exports = function(io,config,client){
  io.of('/logs').on('connection', function(socket) {
    // console.log('socket.io connection made');
    var jsonHitsPrec = '';
    var monitoringTimeout=0;
    var realtime=false;

    var monitor = function(dataLogs) {
      //console.log(dataLogs);
      // TODO : implement restricted access (dataLogs.jwt should be exposed)
      client.search({
        index: config.elasticsearch.indexNames[dataLogs.logType],
        body: {
          query: {
            bool: {
              must: [ 
                { term: { instance: dataLogs.name }},
                { query_string: { query: dataLogs.filters}},
              ]
            }
          },
          "from": dataLogs.from,
          "size": dataLogs.size,
          "sort": [
            { "@timestamp": { "order": "desc" } },
            { "timestamp_processed_in_logstash": { "order": "desc" } },
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
                bool: {
                  must: [ 
                    { term: { instance: dataLogs.name }},
                    { query_string: { query: dataLogs.filters}},
                  ]
                }
              },
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
      if(realtime) {
        monitoringTimeout = setTimeout(monitor, 2000, dataLogs); // Choose the refresh time
      }
    }

    socket.on('getter', (dataLogs) => {
      jsonHitsPrec = '';
      clearTimeout(monitoringTimeout);
      monitor(dataLogs);
    });

    socket.on('realtime_on', () => {
      realtime=true;
    });

    socket.on('realtime_off', () => {
      clearTimeout(monitoringTimeout);
      realtime=false;
    });

    socket.on('disconnect', (reason) => {
      monitor = function() {
        return null;
      };
    });
  });
}