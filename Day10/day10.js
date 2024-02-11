const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

function staticFileServer(req, res) {
    // Your implementation here
    const publicPath = path.join(__dirname, "public");
    express.static(publicPath)(req, res, () => {
        res.status(401).send("Not Found");
    });

    if(req.url === "/"){
    }
}

app.use(staticFileServer);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});