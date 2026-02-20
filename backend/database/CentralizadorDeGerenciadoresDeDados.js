
import { UserRepository } from './GerenciadoresDeDados/UserRepository.js';
import { FinancialRepository } from './GerenciadoresDeDados/FinancialRepository.js';
import { FeeRepository } from './GerenciadoresDeDados/financial/FeeRepository.js';
import { GroupRepository } from './GerenciadoresDeDados/GroupRepository.js';
import { PostRepository } from './GerenciadoresDeDados/PostRepository.js';
import { ChatRepository } from './GerenciadoresDeDados/ChatRepository.js';
import { MarketplaceRepository } from './GerenciadoresDeDados/MarketplaceRepository.js';
import { RelationshipRepository } from './GerenciadoresDeDados/RelationshipRepository.js';
import { InteractionRepository } from './GerenciadoresDeDados/InteractionRepository.js';
import { ReportRepository } from './GerenciadoresDeDados/ReportRepository.js';
import { AuditRepository } from './GerenciadoresDeDados/ServiçosDeLogsSofisticadosRepository.js';
import { AdRepository } from './GerenciadoresDeDados/AdRepository.js';
import { query } from './pool.js';

/**
 * CentralizadorDeGerenciadoresDeDados
 * Centraliza a exportação de todos os gerenciadores de dados do sistema.
 */
export const CentralizadorDeGerenciadoresDeDados = {
    users: UserRepository,
    groups: GroupRepository,
    posts: PostRepository,
    chats: ChatRepository,
    marketplace: MarketplaceRepository,
    relationships: RelationshipRepository,
    interactions: InteractionRepository,
    reports: ReportRepository,
    financial: FinancialRepository,
    fees: FeeRepository,
    ServiçosDeLogsSofisticados: AuditRepository,
    ads: AdRepository,
    query: query,

    // Métodos administrativos legados ou utilitários globais
    admin: {
        async getFinancialStats() {
            const res = await query(`
                SELECT 
                    SUM((data->>'platformProfit')::numeric) as total_profit,
                    SUM(amount) as total_seller_payouts,
                    COUNT(*) as total_sales
                FROM financial_transactions 
                WHERE type = 'sale' AND status = 'paid'
            `);
            return res.rows[0] || { total_profit: 0, total_seller_payouts: 0, total_sales: 0 };
        },
        async recordIp(userId, ip, ua) { /* Implementação futura */ }
    }
};
