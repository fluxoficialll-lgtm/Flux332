
import { randomBytes } from 'crypto';

export const ID_PREFIX = {
    USUARIO: 'usr',
    GRUPO: 'grp',
    POST: 'pos',
    VENDA: 'vnd',
    PRODUTO: 'prd',
    REEL: 'rel',
    MENSAGEM: 'msg',
    COMENTARIO: 'cmt',
    NOTIFICACAO: 'ntf',
    TRANSACAO: 'trn',
    FATURA: 'fat',
    ASSINATURA: 'sub',
    RELATORIO: 'rpt',
    INTERACAO: 'int',
    RELACIONAMENTO: 'rlt',
    ANUNCIO: 'ads',
    CAMPANHA: 'cmp',
    TAXA: 'fee',
    LOG_AUDITORIA: 'aud',
    CONFIGURACAO: 'cfg'
};

/**
 * Gera um ID único, seguro e prefixado, usando o módulo crypto nativo do Node.js.
 * @param {string} prefix - O prefixo para o ID (ex: 'usr', 'grp').
 * @returns {string} O ID único gerado (ex: 'usr_...').
 */
export const gerarId = (prefix) => {
    if (!Object.values(ID_PREFIX).includes(prefix)) {
        console.warn(`[ServiçoGeracaoDe.IDs] Tentativa de gerar ID com prefixo inválido: ${prefix}. Usando prefixo genérico 'obj'.`);
        prefix = 'obj'; // Prefixo genérico para evitar erros
    }
    
    // Gera 16 bytes aleatórios e converte para uma string hexadecimal (32 caracteres).
    const uniquePart = randomBytes(16).toString('hex');
    return `${prefix}_${uniquePart}`;
};
