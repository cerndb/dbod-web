// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Load configuration
var config = require('./server/config');

// Get our API routes
const api = require('./server/routes/api');

const app = express();


// Set our api routes
app.use('/api/v1', api);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.set('port', config.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.port, () => console.log(`API running on localhost:${config.port}`));
