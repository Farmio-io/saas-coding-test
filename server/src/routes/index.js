const pricings = require('./pricing');
const histories = require('./history')

// add the routes here so that can be called from app
const routes = (app) => {
  app.use('/pricing', pricings);
  app.use('/history', histories);
};

module.exports = routes;

