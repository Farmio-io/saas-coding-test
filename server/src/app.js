const express = require('express');
const routes = require('./routes');

const app = express();
const port = 8080;

const start = () => {
  // register express so that can use json data
  app.use(express.json());

  // register routes
  routes(app);

  // start listening to defined port
  app.listen(port, () => {
    console.log('listening in 8080');
  });
};

module.exports = start;

