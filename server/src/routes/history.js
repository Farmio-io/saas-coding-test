const { Router } = require('express');
const db = require('../db');
const query = require('../db/queries');

const router = new Router();

/*
 * this will get the query by customer id
 * it will get all the data recorded in `pricings` from specific cust
 * and then map it to get all the id
 *
 * after that, it will be used to call the histories with the pricing ids
 *
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows: pricingRows } = await db.query(
    query.pricing.getPricingWithCustomerId,
    [id]
  );

  // this will get from [{pricing_id: 1}, {pricing_id: 2}] to [1, 2]
  const result = pricingRows.map((row) => row.pricing_id);

  // join the new array
  const historyParam = result.join(', ');

  // add it in `in (1, 2)` param
  const modifiedQuery = query.history.getHistoryList.replace(
    '$arr',
    historyParam
  );

  const { rows: historyRows } = await db.query(modifiedQuery);

  res.status(200).send({ data: historyRows });
});

module.exports = router;
