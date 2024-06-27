const express = require('express');
const https = require('https');
const socket_io = require('socket.io');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const HOSTNAME = '0.0.0.0';

// Initializing servers
const App = express();
App.use(express.static(path.join(__dirname, '../frontend/build')));
const HTTPSserver = https.createServer({
    key: fs.readFileSync('../localhost+2-key.pem'),
    cert: fs.readFileSync('../localhost+2.pem')
}, App);
const IO = new socket_io.Server(HTTPSserver);


// Routes

// App.get('/', (request, response) => res.send('Hello World!'));
App.get('/home', (request, response) => {

});


// WebSockets

IO.on('connection', socket => {
    console.log('New connection on HTTPS WebSocket');
    socket.on('disconnect', () => console.log('WebSocket (secure) disconnected'));
});


HTTPSserver.listen(PORT, HOSTNAME, () => console.log('HTTPS server running on https://' + HOSTNAME + ':' + PORT));