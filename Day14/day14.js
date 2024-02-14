const express = require('express');
const app = express();
const port = 3000;
const cache = {};

function cachingMiddleware(req, res, next) {
    // Your implementation here
    const url = req.url;
    const cachedResponse = cache[url];

    if(cachedResponse) {
        const {date, expiration} = cachedResponse;
        if(expiration > Date.now()){
            console.log(`Cache response sent... ${url}`);
            return res.send(cachedResponse.data);
        }
        else{
            console.log(`Cache expired for ${url}`);
            delete cache[url];
            next();
        }
    } 
    next();
}

app.use(cachingMiddleware);

app.get('/data', (req, res) => {
    const responseData = 'Happy Valentines Day...Day14 completed!🤩';
    cache[req.url] = {
        data: responseData,
        date: Date.now(),
        expiration: Date.now() + 10000
    };
    res.send(responseData);
});

app.listen(port, () => {    
    console.log(`App listening at http://localhost:${port}`);
}); 