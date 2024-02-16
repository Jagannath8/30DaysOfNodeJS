const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

function connectToMongoDB() {
    // Your implementation here
    mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

app.get('/', (req, res) => {
    connectToMongoDB();
    res.send('MongoDB connection successful!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});