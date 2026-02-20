
import express from 'express';
import { CentralizadorDeGerenciadoresDeDados } from '../database/CentralizadorDeGerenciadoresDeDados.js';

const router = express.Router();

router.get('/:groupId', async (req, res) => {
    try {
        const logs = await CentralizadorDeGerenciadoresDeDados.audit.getLogsByGroup(req.params.groupId);
        res.json({ logs });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/log', async (req, res) => {
    try {
        const { groupId, adminId, adminName, action, targetInfo } = req.body;
        await CentralizadorDeGerenciadoresDeDados.audit.createLog({ groupId, adminId, adminName, action, targetInfo });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
