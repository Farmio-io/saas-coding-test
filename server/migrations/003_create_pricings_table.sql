create table pricings (
  -- id
  pricing_id serial primary key,
  product_id integer not null references products(product_id),
  customer_id integer not null references customers(customer_id),

  -- pricing information
  price numeric(20, 2) not null,
  currency varchar(3) not null,

  -- audit
  effective_date  timestamp with time zone not null default current_timestamp
);

create index idx_pricing_id_product_id_customer_id on pricings (pricing_id, product_id, customer_id);
