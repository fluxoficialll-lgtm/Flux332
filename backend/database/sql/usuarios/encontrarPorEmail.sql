
-- Encontra um usuário pelo seu email
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
    LOWER(email) = LOWER($1);
