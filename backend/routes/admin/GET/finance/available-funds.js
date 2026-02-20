
import { CentralizadorDeGerenciadoresDeDados } from '../../database/CentralizadorDeGerenciadoresDeDados.js';

/**
 * GET /api/admin/execute/finance/available-funds
 * Formato: Padrão D (Liquidez)
 */
export default async (req, res) => {
    try {
        const sql = `
            SELECT COALESCE(SUM(wallet_balance), 0) as current_balance
            FROM users
        `;

        const result = await CentralizadorDeGerenciadoresDeDados.query(sql);
        const row = result.rows[0];

        res.json({
            current_balance: parseFloat(row.current_balance || 0)
        });
    } catch (e) {
        res.status(500).json({ error: "Erro ao consultar liquidez disponível." });
    }
};
