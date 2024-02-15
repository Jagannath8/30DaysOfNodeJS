const express = require('express');
const app = express();
const port = 3000;

function loggingMiddleware(req, res, next) {
    // Your implementation here
    const timestamp = new Date().toISOString();
    console.log(`${req.method} ${req.path} - ${timestamp}`);
    console.log('Headers', req.headers);
    console.log('Body', req.body);
    next();
}

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});