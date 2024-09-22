-- ai gen: for quick seed only
INSERT INTO products (product_name, description)
SELECT 
    product_name,
    description
FROM (
    SELECT 
        unnest(ARRAY[
            'Wireless Headphones', 'Smartphone', 'Laptop', 'Tablet', 
            'Bluetooth Speaker', 'Smartwatch', 'Camera', 'Gaming Console', 
            'Electric Scooter', 'Fitness Tracker'
        ]) AS product_name,
        unnest(ARRAY[
            'High quality sound and long-lasting battery', 
            'Latest model with advanced features', 
            'Lightweight and powerful for all your needs', 
            'Compact and portable with stunning display', 
            'Crystal-clear audio and sleek design', 
            'Waterproof with customizable faces', 
            'Capture moments with ultra HD clarity', 
            'Next-gen performance for immersive gaming', 
            'Eco-friendly with a long-lasting battery', 
            'Track your fitness goals with ease'
        ]) AS description
) AS products;

