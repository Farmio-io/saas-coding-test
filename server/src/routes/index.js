const pricings = require('./pricing');

// add the routes here so that can be called from app
const routes = (app) => {
  app.use('/pricing', pricings);
};

module.exports = routes;

