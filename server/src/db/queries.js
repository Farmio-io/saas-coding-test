/*
 * pricing queries
 */
const pricing = {
  getPricingWithCustomerId:
    'select pricing_id from pricings where customer_id = $1',
  getPricing:
    'select price, pricing_id from pricings where product_id = $1 and customer_id = $2',
  updatePricingWithIds:
    'update pricings set price = $1 where product_id = $2 and customer_id = $3'
};

/*
 * history queries
 */
const history = {
  getHistoryList: 'select * from histories where pricing_id in ($arr)',
  insertHistoryWithIds:
    'insert into histories (previous_price, updated_price, pricing_id) values ($1, $2, $3)'
};

module.exports = {
  pricing,
};

