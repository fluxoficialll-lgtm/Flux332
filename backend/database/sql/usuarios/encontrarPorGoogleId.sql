
-- Encontra um usuário pelo seu Google ID
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
    google_id = $1;
