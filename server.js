// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

var fs = require('fs');
// Uniqid module. Generates random id
var uniqid = require('uniqid');
// Download-file module
var download = require('download-file');
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

//Files Management
var oldFile;
//Download config file from remote to node
app.get('/download', (req, res) => {
  var url = req.query.url;
  var options = {
    directory: "./downloads",
    filename: uniqid(req.query.instance + '&')
  }
  download(url, options, function(err) {
    if(err) throw err
  })
  oldFile = options.filename;
  res.send(options.filename);
});

//Download config file from node to the frontend
app.get('/download/:file', (req, res) => {
  console.log("?downloads/file");
  var path = __dirname + '/downloads/' + req.params.file;
  res.download(path);
});

//Download log file from remote to frontend
app.get('/download/log-file', (req, res) => {
  request(req.query.url).pipe(res)
  res.set('Content-Type', 'text/plain');
});

app.post('/validate', (req, res) => {
  var savedFile = fs.readFileSync(__dirname + '/downloads/' + oldFile, 'utf-8');
  var newFile = req.body.newFile;
  savedFile = JSON.stringify(savedFile);
  savedFile = JSON.parse(savedFile);

  function convertToHash(file){
    var hash = {};
    var lines = file.split("\n");       //split file by lines
    lines.forEach(function(line) {
      line = line.replace(/ /g,'');     //removing whitespaces
      if(!line.match(/^#/) && !line.match(/^\[/) && line != ''){ //Avoid lines that begin with # , [ and empty lines
        if(line.match("#")){
          line = line.split("#"); //splitting lines that contain #
          line = line[0];         //getting the left string of the split
        }
        if(line.match(/.*=.*/)){   //pushing into the list the lines that are not empty
          var split = line.split("=");
          hash[split[0]] = split[1];
        } else {
          hash[line] = 'on';
        }
      }
    });
    return hash;
  }

  var old_config = convertToHash(savedFile);
  var new_config = convertToHash(newFile);

  function compareHash(parameters, old_config, new_config){
    var list = [];
    Object.keys(new_config).forEach(function(key){
      console.log("comparing property: " + key + " new value: " + new_config[key] + " old value: " + old_config[key]);
      //var line = key + '=' + new_config[key];
      if(parameters[key] && (new_config[key] != old_config[key])){
        list.push(key);
      }
    });
    console.log(list);
    return list;
  }
  /*function compareHash(parameters, old_config, new_config){
    var list = {};
    Object.keys(new_config).forEach(function(key){
      console.log("comparing property: " + key + " new value: " + new_config[key] + " old value: " + old_config[key]);
      var line = key + '=' + new_config[key];
      if(parameters[key] && (new_config[key] != old_config[key])){
        list[line] = false;
      } else list[line] = true;
    });
    return list;
  }*/
  var comp = compareHash(config.parameters, old_config, new_config);
  res.send(comp);
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
