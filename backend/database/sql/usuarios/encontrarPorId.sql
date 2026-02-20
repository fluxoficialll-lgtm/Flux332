
-- Encontra um usuário pelo seu ID (UUID)
SELECT 
    id,
    name,
    username,
    email,
    google_id,
    date_of_birth,
    created_at
FROM 
    users 
WHERE 
    id = $1;
