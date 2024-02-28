const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const port = 3000;

app.use(express.static('public'));

function setupWebSocketServer(server) {
    // Your implementation here
    const io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('message', (msg) => {
            console.log('Message: ' + msg);
            io.emit('message', msg);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}

setupWebSocketServer(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
