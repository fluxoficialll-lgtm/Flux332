
import { CentralizadorDeGerenciadoresDeDados } from '../../database/CentralizadorDeGerenciadoresDeDados.js';

export default async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const result = await CentralizadorDeGerenciadoresDeDados.query("DELETE FROM audit_logs WHERE timestamp < NOW() - INTERVAL '$1 days'", [days]);
        res.json({ success: true, count: result.rowCount });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
