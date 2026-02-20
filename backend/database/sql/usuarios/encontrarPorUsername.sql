
-- Encontra um usuário pelo seu username
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
    LOWER(username) = LOWER($1);
