create table histories (
  -- id
  history_id serial primary key,
  pricing_id integer not null references pricings(pricing_id),

  -- history information
  previous_price numeric(20, 2) not null,
  updated_price numeric(20, 2) not null,

  -- audit
  updated_at  timestamp with time zone not null default current_timestamp
);

create index idx_history_id_pricing_id on histories (history_id, pricing_id);
create index idx_updated_at on histories (updated_at desc);
