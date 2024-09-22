create table customers (
  -- id
  customer_id serial primary key,

  -- customer information
  customer_name text not null,
  currency varchar(3) not null
);

