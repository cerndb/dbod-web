var config = require('./config');
var elasticsearch = require('elasticsearch');

const express = require('express');
const router = express.Router();

var connection_string = config.elasticsearch.host;
connection_string = connection_string.replace("//", "//" + config.elasticsearch.user + ":" + config.elasticsearch.password + "@");

var client = new elasticsearch.Client({
    host: connection_string,
    log: 'trace'
});

// Query to obtain logs
router.get('/:dbName/:logType/:size/:from', function (req, res, next) {
  //console.log("dbName " + req.params.dbName + ", logType " + req.params.logType + ", size " + req.params.size + ", from " + req.params.from);
  //console.log("index " + config.elasticsearch.indexNames[req.params.logType]);
  // var source = '/ORA/dbs03/' + req.params.dbName.toUpperCase() + '/mysql/db-gc505.cern.ch.err'
  return client.search({
      index: config.elasticsearch.indexNames[req.params.logType], //'itdb_dbod-mylog-2017.09.08',
      // type: req.params.db_type, //'myslowlog',
      body: {
          query: {
              term: { instance: req.params.dbName }
          },
          "from": req.params.from,
          "size": req.params.size,
          "sort": [
              {
                  "@timestamp": {
                      "order": "desc"
                  }
              }
          ]
      }
  }).then(function (resp) {
      var hits = resp.hits.hits.map(res => res._source);
      //console.log('resp.hits.hits json stringified:');
      //console.log(JSON.stringify(hits));
      res.send(JSON.stringify(hits)); 
  }, function (err) {
      console.trace(err.message);
  });
});

// Query to obtain number of logs
router.get('/:dbName/:logType/count', function (req, res, next) {
  return client.count({
      index: config.elasticsearch.indexNames[req.params.logType], //'itdb_dbod-mylog-2017.09.08',
      body: {
          query: {
              term: { instance: req.params.dbName }
          }
      }
  }).then(function (resp) {
      res.send(JSON.stringify(resp)); 
  }, function (err) {
      console.trace(err.message);
  });
});

module.exports = {
    router: router
}