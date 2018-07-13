// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Load configuration
var config = require('./server/config');

// Get our API routes
const api = require('./server/routes/api');

// Get auth methods
const oauth = require('./server/auth');

const app = express();

// Sessions
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore,
    resave: false,
    secret: 'sessionsecret',
    saveUninitialized: false,
    unset: 'destroy'
    })
);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our API proxy
app.use('/api/v1', api.router);

// Initial page redirecting to Oauth server
app.get('/login', (req, res) => {
    console.log(oauth.authUri);
    res.redirect(oauth.authUri);
});

app.get('/auth', (req, res) => {
    if (! req.session.isAuthenticated) {
        res.redirect('/login');
    }
    response = {}
    response.isAdmin = req.session.isAdmin
    response.isAuthenticated = req.session.isAuthenticated
    response.username = req.session.user.username
    response.fullname = req.session.user.name
    response.federation = req.session.user.federation
    res.send(response)
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', oauth.callback)

// Main App
app.get('/', (req, res) => {
   if (! req.session.isAuthenticated) {
       res.redirect('/login');
   }
   res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/logout', (req, res) => {
    console.log('Destroying session SID: ' + req.session.id);
    req.session.destroy((error) => {
        if (error) {
        console.log(error)}
        }
    );
    res.send("Bye!");
});

app.set('port', config.port);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const server = http.createServer(app);

server.listen(config.port, () => console.log(`API running on localhost:${config.port}`));

////////////////////////////////////////////////////////////
// SOCKET.IO FOR REALTIME COMMUNICATION THROUGH WEBSOCKET //
////////////////////////////////////////////////////////////

var io = require('socket.io');

/////////////////////////
// Elasticsearch, logs //
/////////////////////////

var elasticsearch = require('elasticsearch');

var connection_string = config.elasticsearch.host;
connection_string = connection_string.replace("//", "//" + config.elasticsearch.user + ":" + config.elasticsearch.password + "@");

var client = new elasticsearch.Client({
    host: connection_string,
    // log: 'trace' // FOR MONITORING
});

// WebSocket for real-time communication ("logs" usage)
io = io(server);
app.use(function(req, res, next) {
  req.io = io;
  next();
});

io.on('connection', function(socket) {
  // console.log('socket.io connection made');
  var dataLogs;
  var jsonHitsPrec = '';
  var monitoringLogs=false;
  var monitoringLogsTimeout=0;

  var monitorLogs = function() {
    //console.log(monitoringLogs);
    if(monitoringLogs) {
      client.search({
        index: config.elasticsearch.indexNames[dataLogs.logType],
        body: {
          query: {
            term: { instance: dataLogs.name }
          },
          "from": dataLogs.from,
          "size": dataLogs.size,
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
              //console.log(JSON.stringify(jsonHits));
              socket.emit('countlogs', JSON.stringify(resp));
              socket.emit('logs', jsonHits);
            }, function (err) {
              console.trace(err.message);
            });
        }
      }, function (err) {
        console.trace(err.message);
      });
      monitoringLogsTimeout = setTimeout(monitorLogs, 500); // Choose the refresh time
    }
    else {
      clearTimeout(monitoringLogsTimeout);
    }
  }

  socket.on('logs_getter', (data) => {
    dataLogs = data;
    jsonHitsPrec = '';
    if(!monitoringLogs) {
      monitoringLogs=true;
      monitorLogs();
    }
  });

  socket.on('close_logs_getter', (data) => {
    monitoringLogs=false;
  });

  socket.on('disconnect', (reason) => {
    monitoringLogs=false;
  });
});