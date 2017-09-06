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

//TODO: remove all hard coded values. Start with mylog
function ES_search(params) {
    console.log("dbName " + params.dbName + ", dbType " + params.dbType + ", logType " + params.logType + ", size " + params.size)

    console.log("index " + config.elasticsearch.indexNames[params.logType]);
    var source = '/ORA/dbs03/' + params.dbName.toUpperCase() + '/mysql/db-gc505.cern.ch.err'
    return client.search({
        index: config.elasticsearch.indexNames[params.logType], //'itdb_dbod-mylog-2017.09.08',
        // type: params.db_type, //'myslowlog',
        body: {
            query: {
                term: { source: source }
            },
            "size": params.size,
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
        // console.log('resp.hits.hits json stringified:');
        // console.log(JSON.stringify(hits));
        return JSON.stringify(hits);
    }, function (err) {
        console.trace(err.message);
    });
}



router.get('/:dbName/:dbType/:logType/:size', function (req, res, next) {
    ES_search(req.params).then(function (resp) {
        res.send(resp);
    });
});

module.exports = {
    router: router,
    ES_search
}
