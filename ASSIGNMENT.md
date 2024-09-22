# saas-coding-test

# Coding Test: Product/SaaS Pricing with History and Visualization

## Task Overview
You are tasked with building a simple pricing management system for a SaaS product. The system must allow differentiated pricing for each customer and keep a record of all price updates. You will also implement a simple line chart to visualize price changes for a specific customer.

## Requirements:
1. **Product Table**: Create a master table that holds details about the product(s) being sold. Include:
   - `product_id` (Primary Key)
   - `product_name`
   - `description`

2. **Customer Table**: Create a table to manage customer details. Include:
   - `customer_id` (Primary Key)
   - `customer_name`
   - `currency` (SGD/IDR/HKD/USD)

3. **Pricing Table**: Store the pricing details for each customer. Include:
   - `pricing_id` (Primary Key)
   - `product_id` (Foreign Key)
   - `customer_id` (Foreign Key)
   - `price`
   - `effective_date` (Datetime of when the price becomes active)

4. **Price History Table**: Store the history of all price updates for each customer. This should capture:
   - `history_id` (Primary Key)
   - `pricing_id` (Foreign Key)
   - `previous_price`
   - `updated_price`
   - `update_timestamp` (Datetime when the price was updated)

5. **Price Tracking**: Implement a function that tracks price updates for a given customer and stores it in the history table. This should:
   - Check if the new price is different from the previous price.
   - If different, update the pricing table and store the old price in the history table.

6. **Currency Differentiation**: Ensure that each customer’s price is displayed in their respective currency.

## Bonus:
- **Line Chart Visualization**: 
  - Build a simple line chart showing the price history for a particular customer over time.
  - Consider timezone differences for countries like Indonesia (UTC+7) and Singapore (UTC+8) when plotting the 1-week date range.

## Technologies:
You may use any stack you prefer, but we recommend using:
- **Backend**: Node.js with Express (or any other framework)
- **Database**: PostgreSQL (or any other relational DB)
- **Frontend**: React.js (or any JS framework) for the line chart
- **Charting Library**: Chart.js or D3.js for visualization

## Key Evaluation Criteria:
1. **Correctness**: The solution should correctly implement the pricing model, history tracking, and visualization.
2. **Database Design**: Proper use of foreign keys, indexes, and efficient queries.
3. **Timezone Handling**: Properly handle timezone differences between customers.
4. **Bonus**: Effective implementation of the line chart with timezone handling.

## Example Scenario:
1. Customer A (Currency: SGD) buys Product X for 50 SGD. 
2. Two weeks later, the price is updated to 55 SGD.
3. Your system should track this change and visualize the price history over time, correctly accounting for any timezone difference if this happened in Indonesia or Singapore.

## Time:
This test should take **1 to 1.5 hours** to complete.
