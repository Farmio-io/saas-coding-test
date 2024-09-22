-- ai gen: for quick seed only
INSERT INTO pricings (product_id, customer_id, price, currency, effective_date)
SELECT 
    p.product_id,
    c.customer_id,
    ROUND((random() * 1000 + 50)::numeric, 2) AS price, -- Random price between 50.00 and 1050.00
    c.currency, -- Use the customer's currency
    NOW() - (random() * INTERVAL '30 days') AS effective_date -- Random date within the last 30 days
FROM 
    products p,
    customers c
ORDER BY 
    random()
LIMIT 10; -- Insert 10 random record

