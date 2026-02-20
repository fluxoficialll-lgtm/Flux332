
import { CentralizadorDeGerenciadoresDeDados } from '../../database/CentralizadorDeGerenciadoresDeDados.js';

/**
 * GET /api/admin/execute/finance/fee-rules
 * Lista todas as regras de taxas por provedor, método e país.
 */
export default async (req, res) => {
    try {
        const rules = await CentralizadorDeGerenciadoresDeDados.fees.getAllRules();
        res.json({
            success: true,
            data: rules
        });
    } catch (e) {
        console.error("[Admin GET finance/fee-rules] Error:", e.message);
        res.status(500).json({ error: "Erro ao listar regras de taxas: " + e.message });
    }
};
