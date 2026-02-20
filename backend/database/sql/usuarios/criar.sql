
-- Cria um novo usuário com um ID pré-gerado
INSERT INTO users (id, name, username, email, password_hash, date_of_birth, google_id)
VALUES ($1, $2, $3, $4, $5, $6, $7);
