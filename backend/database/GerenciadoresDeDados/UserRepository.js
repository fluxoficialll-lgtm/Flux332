
import { query } from '../pool.js';
import { carregarConsulta } from '../gerenciadorDeConsultas.js';

const toUuid = (val) => (val === "" || val === "undefined" || val === "null") ? null : val;

// Mapeia uma linha do banco de dados para o formato de objeto User
const mapRowToUser = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name,
        username: row.username,
        email: row.email,
        googleId: row.google_id, 
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
        const sql = await carregarConsulta('usuarios/encontrarPorEmail.sql');
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
        const sql = await carregarConsulta('usuarios/encontrarPorUsername.sql');
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
        const sql = await carregarConsulta('usuarios/encontrarPorId.sql');
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
        const sql = await carregarConsulta('usuarios/encontrarPorGoogleId.sql');
        const res = await query(sql, [googleId]);
        if (res.rows[0]) {
            console.log(`[PostgreSQL] User with Google ID ${googleId} was read from the database.`);
        }
        return mapRowToUser(res.rows[0]);
    },

    /**
     * Cria um novo usuário no banco de dados.
     * O ID deve ser pré-gerado e fornecido no objeto user.
     * @param {object} user - O objeto do usuário a ser criado, incluindo o ID.
     * @returns {string} O ID do usuário criado.
     */
    async create(user) {
        const { id, name, username, email, passwordHash, dateOfBirth, googleId } = user;

        if (!id) {
            throw new Error('User creation failed: ID is missing. The calling service (e.g., auth route) must generate it.');
        }

        const sql = await carregarConsulta('usuarios/criar.sql');
        const params = [id, name, username, email.toLowerCase().trim(), passwordHash, dateOfBirth, googleId];
        await query(sql, params);
        
        console.log(`[PostgreSQL] User successfully inserted with ID: ${id}`);
        return id;
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

        const sql = await carregarConsulta('usuarios/atualizar.sql');
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

        const sql = await carregarConsulta('usuarios/apagar.sql');
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
        const sql = await carregarConsulta('usuarios/listarTodos.sql');
        const res = await query(sql);
        console.log(`[PostgreSQL] ${res.rowCount} users read from the database.`);
        return res.rows.map(mapRowToUser);
    }
};
