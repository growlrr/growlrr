-- migration: create chat_messages and orders tables
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id integer NULL,
  question text NOT NULL,
  difficulty varchar(10) NOT NULL,
  answer text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id integer,
  items jsonb,           -- array of { sku, qty, name }
  total_cents integer,
  currency varchar(3) default 'USD',
  status varchar(20) default 'pending',
  created_at timestamptz default now()
);
