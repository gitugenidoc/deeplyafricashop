CREATE TABLE IF NOT EXISTS reveal_orders (
  shopify_order_id TEXT PRIMARY KEY,
  order_email TEXT NOT NULL DEFAULT '',
  assigned_country TEXT NOT NULL,
  reveal_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL
);
