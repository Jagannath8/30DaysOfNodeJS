const express = require('express');
const app = express();
const port = 3000;

class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

function errorHandler(err, req, res, next) {
    console.error(err.message);
    if (err instanceof CustomError) {
        res.status(err.status).send(err.message);
    }
    else {
        res.status(500).send('Something went wrong!');
    }
}

app.use(errorHandler);

app.get('/test', (req, res) => {
    throw new CustomError('This is a custom error', 400);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});