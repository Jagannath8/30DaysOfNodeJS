const express = require('express');
const app = express();
const port = 3000;

const authenticate = require('./authMiddleware');

app.get('/', (req, res) => {
    res.send('You are authorized! Day11 completed!🤩');
});

app.get('/protected', authenticate, (req, res) => {
    res.send('You are not authorized');
});

app.listen(port, () => {    
    console.log(`App listening at http://localhost:${port}`);
}); 