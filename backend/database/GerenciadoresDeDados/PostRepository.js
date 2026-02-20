
import { query } from '../pool.js';

// Mapeia uma linha do banco de dados para o formato de objeto Post
const mapRowToPost = (row) => {
    if (!row) return null;
    // As colunas 'data', 'is_ad', 'is_adult' são mescladas no objeto principal
    const post = {
        ...(row.data || {}),
        id: row.id,
        content: row.content,
        authorId: row.author_id,
        likesCount: parseInt(row.likes_count, 10) || 0,
        isAd: row.is_ad,
        isAdult: row.is_adult,
        createdAt: row.created_at,
    };
    return post;
};

export const PostRepository = {
    /**
     * Cria uma nova postagem no banco de dados.
     * @param {object} post - O objeto da postagem a ser criado.
     * @returns {string} O ID da postagem criada.
     */
    async create(post) {
        const { id, authorId, content, isAd = false, isAdult = false, ...data } = post;
        const sql = `
            INSERT INTO posts (id, author_id, content, is_ad, is_adult, data)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;
        const params = [id, authorId, content, isAd, isAdult, JSON.stringify(data)];
        
        const res = await query(sql, params);
        console.log(`[PostgreSQL] Post successfully inserted with ID: ${res.rows[0].id}`);
        return res.rows[0].id;
    },

    /**
     * Lista as postagens do feed.
     * @param {number} limit - O número de postagens a serem retornadas.
     * @param {string} cursor - O cursor para paginação (timestamp da última postagem vista).
     * @returns {Array<object>} Uma lista de postagens.
     */
    async list(limit = 50, cursor = null) {
        let sql = `
            SELECT 
                p.*, 
                COUNT(l.user_id) AS likes_count
            FROM posts p
            LEFT JOIN likes l ON p.id = l.post_id
        `;
        const params = [];
        
        if (cursor) {
            params.push(cursor);
            sql += `WHERE p.created_at < $${params.length} `;
        }
        
        sql += `
            GROUP BY p.id
            ORDER BY p.created_at DESC 
            LIMIT $${params.length + 1}
        `;
        params.push(limit);

        const res = await query(sql, params);
        console.log(`[PostgreSQL] ${res.rowCount} posts read from the database.`);
        return res.rows.map(mapRowToPost);
    },

    /**
     * Apaga uma postagem do banco de dados.
     * @param {string} id - O ID da postagem a ser apagada.
     * @returns {boolean} True se a postagem foi apagada com sucesso.
     */
    async delete(id) {
        const sql = 'DELETE FROM posts WHERE id = $1';
        const res = await query(sql, [id]);
        if (res.rowCount > 0) {
            console.log(`[PostgreSQL] Post with ID: ${id} successfully deleted.`);
        }
        return res.rowCount > 0;
    },

    /**
     * Adiciona um comentário a uma postagem.
     * @param {string} postId - O ID da postagem que está sendo comentada.
     * @param {object} comment - O objeto do comentário. Deve conter author_id e content.
     * @returns {string} O ID do comentário criado.
     */
    async addComment(postId, comment) {
        const { author_id, content, ...data } = comment;
        const sql = `
            INSERT INTO comments (post_id, author_id, content, data)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;
        const params = [postId, author_id, content, JSON.stringify(data)];

        const res = await query(sql, params);
        console.log(`[PostgreSQL] Comment inserted with ID: ${res.rows[0].id} on Post ID: ${postId}`);
        return res.rows[0].id;
    }
};
