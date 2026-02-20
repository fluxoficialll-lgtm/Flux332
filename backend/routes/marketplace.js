
import express from 'express';
import { CentralizadorDeGerenciadoresDeDados } from '../database/CentralizadorDeGerenciadoresDeDados.js';

const router = express.Router();

// Listar todos os itens (Orgânicos)
router.get('/', async (req, res) => {
    try {
        const items = await CentralizadorDeGerenciadoresDeDados.marketplace.list();
        res.json({ data: items });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Buscar item específico
router.get('/:id', async (req, res) => {
    try {
        const item = await CentralizadorDeGerenciadoresDeDados.marketplace.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });
        res.json({ item });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Criar/Atualizar item
router.post('/create', async (req, res) => {
    try {
        const item = req.body;
        if (!item.id || !item.sellerId) {
            return res.status(400).json({ error: "Dados incompletos (id e sellerId são obrigatórios)" });
        }
        await CentralizadorDeGerenciadoresDeDados.marketplace.create(item);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Deletar item
router.delete('/:id', async (req, res) => {
    try {
        await CentralizadorDeGerenciadoresDeDados.marketplace.delete(req.params.id);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
