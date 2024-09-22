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

module.exports = {
  pricing,
};

