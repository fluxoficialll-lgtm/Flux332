CREATE TABLE groups (
    id TEXT PRIMARY KEY,
    creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_vip BOOLEAN DEFAULT FALSE,
    member_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
