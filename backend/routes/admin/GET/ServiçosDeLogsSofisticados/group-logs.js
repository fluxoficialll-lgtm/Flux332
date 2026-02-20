
import { CentralizadorDeGerenciadoresDeDados } from '../../database/CentralizadorDeGerenciadoresDeDados.js';

/**
 * GET /api/admin/execute/ServiçosDeLogsSofisticados/group-logs?groupId=...
 */
export default async (req, res) => {
    try {
        const { groupId } = req.query;
        if (!groupId) return res.status(400).json({ error: "groupId é obrigatório." });

        const logs = await CentralizadorDeGerenciadoresDeDados.ServiçosDeLogsSofisticados.getLogsByGroup(groupId);
        res.json({ success: true, logs });
    } catch (e) {
        res.status(500).json({ error: "Erro ao buscar logs de auditoria." });
    }
};
