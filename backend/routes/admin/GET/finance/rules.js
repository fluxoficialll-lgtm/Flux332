
import { CentralizadorDeGerenciadoresDeDados } from '../../database/CentralizadorDeGerenciadoresDeDados.js';

/**
 * GET /api/admin/execute/finance/rules
 * Lista todas as regras de taxas configuradas.
 */
export default async (req, res) => {
    try {
        const rules = await CentralizadorDeGerenciadoresDeDados.fees.getAllRules();
        res.json({
            success: true,
            data: rules
        });
    } catch (e) {
        console.error("[Admin GET finance/rules] Error:", e.message);
        res.status(500).json({ error: "Erro ao listar regras de taxas." });
    }
};
