const express = require('express');
const app = express();
const port = 4000;
const timeWindow = 15 * 60 * 1000;
const maxRequests = 1;
const requestCount = {};

function rateLimitMiddleware(req, res, next) {
    // Your implementation here
    const IP = req.ip;
    requestCount[IP] = requestCount[IP] || { count: 0, time: new Date() };

    if(Date.now() - requestCount[IP].lastReset > timeWindow) {
        requestCount[IP].count = 0;
        requestCount[IP].lastReset = Date.now();
    }

    if(requestCount[IP].count >= maxRequests) {
        res.status(429).json({ error: 'Too many requests' });
    }

    requestCount[IP].count++;
    next();
}

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
    res.send('Day12 completed!🤩');
});

app.listen(port, () => {    
    console.log(`App listening at http://localhost:${port}`);
}); 