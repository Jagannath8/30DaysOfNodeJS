const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const path = require('path');
const port = 8080;


function setupWebSocket(server) {
    // Your implementation here
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('message',(message) => {
            console.log(`Received message: ', ${message}`);
            ws.send(`Hello, you sent -> ${message}`)
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

setupWebSocket(server);

app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {    
    console.log(`App listening at http://localhost:${port}`);
}); 