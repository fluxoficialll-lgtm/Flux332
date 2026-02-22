
import { pool } from '../database/pool.js';
import { gerarId } from '../ServiçosBackEnd/FabricaDeIDS.js';
import { conversationRepositorio } from './conversation.repositorio.js';

const toMessageObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        conversationId: row.conversation_id,
        senderId: row.sender_id,
        content: row.content,
        createdAt: row.created_at,
        readAt: row.read_at,
    };
};

export const messageRepositorio = {
    /**
     * Cria uma nova mensagem em uma conversa.
     * Atualiza o timestamp da última mensagem na conversa.
     * @param {string} conversationId - O ID da conversa.
     * @param {string} senderId - O ID do remetente.
     * @param {string} content - O conteúdo da mensagem.
     * @returns {Promise<object>} O objeto da mensagem criada.
     */
    async create(conversationId, senderId, content) {
        const messageId = gerarId();
        const insertQuery = `
            INSERT INTO messages (id, conversation_id, sender_id, content)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        // Executa a inserção da mensagem e a atualização da conversa em paralelo
        const [messageRes] = await Promise.all([
            pool.query(insertQuery, [messageId, conversationId, senderId, content]),
            conversationRepositorio.updateLastMessage(conversationId)
        ]);
        
        return toMessageObject(messageRes.rows[0]);
    },

    /**
     * Busca todas as mensagens de uma conversa específica, com paginação.
     * @param {string} conversationId - O ID da conversa.
     * @param {object} options - Opções de paginação.
     * @param {number} [options.limit=100] - O número de mensagens a serem retornadas.
     * @param {number} [options.offset=0] - O deslocamento para a paginação.
     * @returns {Promise<object[]>} Uma lista de mensagens.
     */
    async listByConversation(conversationId, { limit = 100, offset = 0 } = {}) {
        const query = `
            SELECT * FROM messages
            WHERE conversation_id = $1
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3;
        `;
        const res = await pool.query(query, [conversationId, limit, offset]);
        return res.rows.map(toMessageObject);
    },

    /**
     * Marca mensagens como lidas em uma conversa para um usuário específico.
     * @param {string} conversationId - O ID da conversa.
     * @param {string} userId - O ID do usuário que leu as mensagens.
     * @returns {Promise<void>}
     */
    async markAsRead(conversationId, userId) {
        const query = `
            UPDATE messages
            SET read_at = CURRENT_TIMESTAMP
            WHERE conversation_id = $1 AND sender_id != $2 AND read_at IS NULL;
        `;
        await pool.query(query, [conversationId, userId]);
    }
};
