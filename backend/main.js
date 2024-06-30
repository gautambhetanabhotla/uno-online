import express from 'express';
import https from 'https';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOSTNAME = '0.0.0.0';

// Initializing servers
const App = express();
App.use(express.static(path.join(__dirname, 'build')));

const HTTPSserver = https.createServer({
    key: fs.readFileSync('../localhost+2-key.pem'),
    cert: fs.readFileSync('../localhost+2.pem')
}, App);
const IO = new Server(HTTPSserver);


// Routes

App.get('/home', function (request, response) {
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

App.get("/test", (req, res) => {
    res.send("Hello World!");
});

// WebSockets

IO.on('connection', socket => {
    console.log('New connection on HTTPS WebSocket');
    socket.on('disconnect', () => console.log('WebSocket (secure) disconnected'));
});


HTTPSserver.listen(process.env.PORT, '0.0.0.0', () => {
    if(process.env.node_env === 'development') console.log('HTTPS server running on https://0.0.0.0:' + process.env.PORT);
});