-- ai gen: for quick seed only
INSERT INTO customers (customer_name, currency)
SELECT 
    customer_name,
    currency
FROM (
    SELECT 
        unnest(ARRAY[
            'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 
            'Hank', 'Ivy', 'Jack'
        ]) AS customer_name,
        unnest(ARRAY[
            'SGD', 'IDR', 'HKD', 'USD', 'SGD', 'IDR', 'HKD', 
            'USD', 'SGD', 'IDR'
        ]) AS currency
    ORDER BY random()
) AS customers;

