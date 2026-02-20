CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    handle TEXT UNIQUE,
    google_id TEXT UNIQUE,
    referred_by_id UUID REFERENCES users(id),
    data JSONB,
    wallet_balance NUMERIC(10, 2) DEFAULT 0.00,
    is_banned BOOLEAN DEFAULT FALSE,
    is_profile_completed BOOLEAN DEFAULT FALSE,
    trust_score INTEGER DEFAULT 100,
    strikes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
