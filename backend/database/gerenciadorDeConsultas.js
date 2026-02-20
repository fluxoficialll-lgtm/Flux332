
import fs from 'fs/promises';
import path from 'path';

const cacheDeConsultas = new Map();

/**
 * Carrega e armazena em cache uma consulta SQL de um arquivo.
 * O caminho é relativo ao diretório 'backend/database/sql'.
 * @param {string} caminhoArquivo - Ex: 'usuarios/encontrarPorId.sql'
 * @returns {Promise<string>} A string da consulta SQL.
 */
export async function carregarConsulta(caminhoArquivo) {
    if (cacheDeConsultas.has(caminhoArquivo)) {
        return cacheDeConsultas.get(caminhoArquivo);
    }

    try {
        // Constrói um caminho absoluto para o arquivo SQL
        const caminhoCompleto = path.join(process.cwd(), 'backend', 'database', 'sql', caminhoArquivo);
        const sql = await fs.readFile(caminhoCompleto, 'utf-8');
        
        cacheDeConsultas.set(caminhoArquivo, sql);
        console.log(`[GerenciadorDeConsultas] Consulta carregada e em cache: ${caminhoArquivo}`);
        
        return sql;
    } catch (error) {
        console.error(`❌ Erro ao carregar a consulta de ${caminhoArquivo}:`, error);
        throw new Error(`Não foi possível carregar a consulta: ${caminhoArquivo}`);
    }
}
