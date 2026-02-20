
-- Lista todos os usuários
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
ORDER BY 
    created_at DESC 
LIMIT 1000;
