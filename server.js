// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Load configuration
var config = require('./server/config');

// Get our API routes
const api = require('./server/routes/api');

// Get our ES routes
const ES = require('./server/elasticsearch');

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
// Set our ES proxy
app.use('/ES', ES.router);

// Initial page redirecting to Oauth server
app.get('/login', (req, res) => {
    res.redirect(oauth.authUri);
});

app.get('/auth', (req, res) => {
    if (! req.session.isAuthenticated) {
        res.redirect('/login');
    }
    response = {}
    // response.isAdmin = req.session.isAdmin
    response.isAdmin = true //TO REMOVE
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
