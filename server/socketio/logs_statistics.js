exports = module.exports = function(io,config,client){
  io.of('/logs_statistics').on('connection', function(socket) {
    // console.log('socket.io connection made');
    var dataLogsStatistics;
    var statsPrec = '';
    var monitoringTimeout=0;

		var buildHistogram = (data) => {
			return new Promise( (resolve, reject) => {
				var tmin = new Date(dataLogsStatistics.tmin);
				var tmax = new Date(dataLogsStatistics.tmax);
				var tminSlice = new Date(tmin.getTime()+data.i/dataLogsStatistics.n*(tmax.getTime()-tmin.getTime()));
    		var tmaxSlice = new Date(tmin.getTime()+(data.i+1)/dataLogsStatistics.n*(tmax.getTime()-tmin.getTime()));
	    	client.count({
          index: config.elasticsearch.indexNames[dataLogsStatistics.logType],
          body: {
            query: {
            	bool: {
            		must: [ 
					        { term: { instance: dataLogsStatistics.name }},
		              { range : {
				            "@timestamp" : {
				              "gte" : tminSlice,
				              "lt" : tmaxSlice,
				            }
				      		}}
					      ]
					    }
            },
          }
        }).then(function (resp) {
        	// console.log(resp);
          data.histogram.push({
          	'tminSlice': tminSlice,
          	'tmaxSlice': tmaxSlice,
          	'numberOfLogs': resp.count,
          });
          data.i++;
		    	resolve(data);
        }, function (err) {
          reject(err);
        });
			});
		};

    var monitor = function() {
	    // console.log(dataLogsStatistics);
    	// Getting the oldest
      client.search({
        index: config.elasticsearch.indexNames[dataLogsStatistics.logType],
        body: {
          query: {
            term: { instance: dataLogsStatistics.name }
          },
          "size": 1,
          "sort": [
          { "@timestamp": { "order": "asc" } },
          ]
        }
      }).then(function (resp) {
        var hits = resp.hits.hits.map(res => res._source);
        // console.log(hits[0]);
        var oldestTimestamp = hits[0]['@timestamp'];
        // Getting the newest
        client.search({
	        index: config.elasticsearch.indexNames[dataLogsStatistics.logType],
	        body: {
	          query: {
	            term: { instance: dataLogsStatistics.name }
	          },
	          "size": 1,
	          "sort": [
	          { "@timestamp": { "order": "desc" } },
	          ]
	        }
	      }).then(function (resp) {
	        var hits = resp.hits.hits.map(res => res._source);
        	var newestTimestamp = hits[0]['@timestamp'];
	        // Counting in each interval of time

	        var histogram = [];
	        var buildHistogramPromise = Promise.resolve({'histogram': histogram, 'i': 0});
	        for(var i=0; i<dataLogsStatistics.n; i++) {
	        	buildHistogramPromise = buildHistogramPromise.then(buildHistogram);
	        }
	        buildHistogramPromise.then( (data) => {
	        	// console.log(data.histogram);
	        	var stats = JSON.stringify({'histogram': data.histogram, 'oldestTimestamp': oldestTimestamp, 'newestTimestamp': newestTimestamp });
	        	if(stats!=statsPrec) {
	        		statsPrec = stats;
	        		socket.emit('logs_statistics', stats);
	        	}
	        });
      	}, function (err) {
        	console.trace(err.message);
      	});
      }, function (err) {
        console.trace(err.message);
      }); 
	    monitoringTimeout = setTimeout(monitor, 500); // Choose the refresh time
    }

    socket.on('getter', (data) => {
      dataLogsStatistics = data;
      statsPrec = '';
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