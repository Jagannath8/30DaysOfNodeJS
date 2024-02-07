const express = require('express');
const app = express();
const port = 4000;

function requestLoggerMiddleware(req, res, next) {
    // Your implementation here
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} requet received`);
    next();
  }

  app.use(requestLoggerMiddleware);
  app.get('/', (req, res) => {
    res.send('Reload Me!');
  });
  
  app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
  });