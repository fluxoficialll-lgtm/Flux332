
-- Atualiza um usuário
UPDATE users SET 
    name = COALESCE($1, name),
    username = COALESCE($2, username),
    email = COALESCE($3, email),
    password_hash = COALESCE($4, password_hash),
    date_of_birth = COALESCE($5, date_of_birth),
    google_id = COALESCE($6, google_id)
WHERE id = $7;
