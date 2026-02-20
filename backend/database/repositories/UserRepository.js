
import { query } from '../pool.js';

const toUuid = (val) => (val === "" || val === "undefined" || val === "null") ? null : val;

// Mapeia uma linha do banco de dados para o formato de objeto User
const mapRowToUser = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name,
        username: row.username,
        email: row.email,
        googleId: row.google_id, // Adicionado google_id
        dateOfBirth: row.date_of_birth,
        createdAt: row.created_at
    };
};

export const UserRepository = {
    /**
     * Encontra um usuário pelo email.
     * @param {string} email - O email do usuário.
     * @returns {object|null} O usuário encontrado ou nulo.
     */
    async findByEmail(email) {
        if (!email) return null;
        const sql = 'SELECT * FROM users WHERE email = $1';
        const res = await query(sql, [email.toLowerCase().trim()]);
        if (res.rows[0]) {
            console.log(`[PostgreSQL] User with email ${email} was read from the database.`);
        }
        return mapRowToUser(res.rows[0]);
    },

    /**
     * Encontra um usuário pelo username.
     * @param {string} username - O username do usuário.
     * @returns {object|null} O usuário encontrado ou nulo.
     */
    async findByUsername(username) {
        if (!username) return null;
        const sql = 'SELECT * FROM users WHERE username = $1';
        const res = await query(sql, [username.toLowerCase().trim()]);
        if (res.rows[0]) {
            console.log(`[PostgreSQL] User with username ${username} was read from the database.`);
        }
        return mapRowToUser(res.rows[0]);
    },

    /**
     * Encontra um usuário pelo ID.
     * @param {string} id - O ID do usuário.
     * @returns {object|null} O usuário encontrado ou nulo.
     */
    async findById(id) {
        const uuid = toUuid(id);
        if (!uuid) return null;
        const sql = 'SELECT * FROM users WHERE id = $1';
        const res = await query(sql, [uuid]);
        if (res.rows[0]) {
            console.log(`[PostgreSQL] User with ID ${id} was read from the database.`);
        }
        return mapRowToUser(res.rows[0]);
    },

    /**
     * Encontra um usuário pelo Google ID.
     * @param {string} googleId - O ID do Google do usuário.
     * @returns {object|null} O usuário encontrado ou nulo.
     */
    async findByGoogleId(googleId) {
        if (!googleId) return null;
        const sql = 'SELECT * FROM users WHERE google_id = $1';
        const res = await query(sql, [googleId]);
        if (res.rows[0]) {
            console.log(`[PostgreSQL] User with Google ID ${googleId} was read from the database.`);
        }
        return mapRowToUser(res.rows[0]);
    },

    /**
     * Cria um novo usuário no banco de dados.
     * @param {object} user - O objeto do usuário a ser criado.
     * @returns {string} O ID do novo usuário.
     */
    async create(user) {
        const { name, username, email, passwordHash, dateOfBirth, googleId } = user;
        const sql = `
            INSERT INTO users (name, username, email, password_hash, date_of_birth, google_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;
        const params = [name, username, email.toLowerCase().trim(), passwordHash, dateOfBirth, googleId];
        const res = await query(sql, params);
        const newUserId = res.rows[0].id;
        console.log(`[PostgreSQL] User successfully inserted with ID: ${newUserId}`);
        return newUserId;
    },

    /**
     * Atualiza os dados de um usuário.
     * @param {object} user - O objeto do usuário com os campos a serem atualizados.
     * @returns {boolean} True se a atualização foi bem-sucedida.
     */
    async update(user) {
        const { id, name, username, email, passwordHash, dateOfBirth, googleId } = user;
        const uuid = toUuid(id);
        if (!uuid) throw new Error('Update failed: Invalid or missing user ID.');

        const sql = `
            UPDATE users SET 
                name = COALESCE($1, name),
                username = COALESCE($2, username),
                email = COALESCE($3, email),
                password_hash = COALESCE($4, password_hash),
                date_of_birth = COALESCE($5, date_of_birth),
                google_id = COALESCE($6, google_id) // Adicionado google_id
            WHERE id = $7
        `;
        const params = [name, username, email, passwordHash, dateOfBirth, googleId, uuid];
        const res = await query(sql, params);
        if (res.rowCount > 0) {
            console.log(`[PostgreSQL] User with ID ${uuid} was successfully updated.`);
        }
        return res.rowCount > 0;
    },

    /**
     * Apaga um usuário do banco de dados.
     * @param {string} id - O ID do usuário a ser apagado.
     * @returns {boolean} True se o usuário foi apagado com sucesso.
     */
    async delete(id) {
        const uuid = toUuid(id);
        if (!uuid) return false;

        const sql = 'DELETE FROM users WHERE id = $1';
        const res = await query(sql, [uuid]);

        if (res.rowCount > 0) {
            console.log(`[PostgreSQL] User with ID: ${id} successfully deleted.`);
        }
        return res.rowCount > 0;
    },

    /**
     * Lista todos os usuários.
     * @returns {Array<object>} Uma lista de usuários.
     */
    async getAll() {
        const sql = 'SELECT * FROM users ORDER BY created_at DESC LIMIT 1000';
        const res = await query(sql);
        console.log(`[PostgreSQL] ${res.rowCount} users read from the database.`);
        return res.rows.map(mapRowToUser);
    }
};
