-- ai gen: for quick seed only
WITH random_pricings AS (
    SELECT 
        pricing_id,
        price AS current_price
    FROM pricings
    ORDER BY random()
    LIMIT 5
), updated_prices AS (
    SELECT 
        rp.pricing_id,
        ROUND((rp.current_price * (1 + (random() - 0.5) * 0.2))::numeric, 2) AS previous_price, -- Random previous price with a small fluctuation (±20%)
        rp.current_price AS updated_price,
        NOW() - (random() * INTERVAL '30 days') AS updated_at -- Random date within the last 30 days
    FROM random_pricings rp
    ORDER BY random()
    LIMIT 10
)
-- Insert into histories
INSERT INTO histories (pricing_id, previous_price, updated_price, updated_at)
SELECT 
    pricing_id,
    previous_price,
    updated_price,
    updated_at
FROM updated_prices;

-- Update pricings table with new prices
UPDATE pricings
SET price = up.updated_price
FROM updated_prices up
WHERE pricings.pricing_id = up.pricing_id;

-- relation error warning from psql might turn up but it does the job

