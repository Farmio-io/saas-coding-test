create table products (
  -- id
  product_id serial primary key,

  -- product information
  product_name text not null,
  description text not null
);
