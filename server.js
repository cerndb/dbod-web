// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Request method
var request = require('request');
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

session = session({
  store: new FileStore,
  resave: false,
  secret: 'sessionsecret',
  saveUninitialized: false,
  unset: 'destroy'
});

app.use(session);

// Set our API proxy
// This needs to be the first definition to prevent this issue
// https://github.com/dvonlehman/express-request-proxy/issues/9
// affecting POST (and PUT) operations
app.use('/api/v1', api.router);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    response.jwt = req.session.token
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

app.get('/download', (req, res) => {
  request(req.query.url).pipe(res)
  res.set('Content-Type', 'text/plain');
});

app.get('/logout', (req, res) => {
    console.log('Destroying session SID: ' + req.session.id);
    req.session.destroy((error) => {
        if (error) {
        console.log(error)}
        }
    );
    res.redirect('https://login.cern.ch/adfs/ls/?wa=wsignout1.0');
});

app.set('port', config.port);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const server = http.createServer(app);

server.listen(config.port, () => console.log(`API running on localhost:${config.port}`));

// Elasticsearch (for logs)

var elasticsearch = require('elasticsearch');

var connection_string = config.elasticsearch.host;
connection_string = connection_string.replace("//", "//" + config.elasticsearch.user + ":" + config.elasticsearch.password + "@");

var client = new elasticsearch.Client({
    host: connection_string,
    // log: 'trace' // FOR MONITORING
});

////////////////////////////////////////////////////////////
// SOCKET.IO FOR REALTIME COMMUNICATION THROUGH WEBSOCKET //
////////////////////////////////////////////////////////////

var io = require('socket.io');
io = io(server);

io.use(function(socket, next) {
    session(socket.request, socket.request.res, next);
});

var instance_module = require('./server/socketio/instance')(io,config,client);
var logs_module = require('./server/socketio/logs')(io,config,client);
var logs_statistics_module = require('./server/socketio/logs_statistics')(io,config,client);
var jobs_module = require('./server/socketio/jobs')(io,config,client);
