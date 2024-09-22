const { Router } = require('express');
const db = require('../db');
const query = require('../db/queries');

const router = new Router();

/*
 * We apply a middleware so that if there is the same price
 * we don't update the db
 *
 */
const checkPrice = async (req, res, next) => {
  const { productId, customerId, newPrice } = req.body;

  // check db
  const { rows } = await db.query(query.pricing.getPricing, [
    productId,
    customerId
  ]);

  // get the first row
  const [fr] = rows;

  // check if the new price is same as the old price
  if (Number(fr.price) === newPrice) {
    return res.status(400).send({ data: 'data not updated, same price' });
  }

  // if not, then pass the data into the next call
  req.oldData = {
    oldPrice: Number(fr.price),
    pricingId: fr.pricing_id
  };

  next();
};

/*
 * We add a post call so that we don't use the ids 
 * in the query string or params, I think its more good to pass it into body
 *
 */
router.post('/', checkPrice, async (req, res) => {
  const { body, oldData } = req;
  const { productId, customerId, newPrice } = body;
  const { oldPrice, pricingId } = oldData;

  // pricing update
  const pricingParams = [newPrice, productId, customerId];
  await db.query(query.pricing.updatePricingWithIds, pricingParams);

  // history update
  const historyParams = [oldPrice, newPrice, pricingId];
  await db.query(query.history.insertHistoryWithIds, historyParams);

  res.status(201).send({ data: 'success update pricing and history!' });
});

module.exports = router;
