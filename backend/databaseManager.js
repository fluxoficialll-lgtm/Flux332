
import { SchemaBootstrapper } from './database/SchemaBootstrapper.js';
import { CentralizadorDeGerenciadoresDeDados } from './database/CentralizadorDeGerenciadoresDeDados.js';

/**
 * dbManager
 * Fachada unificada que mantém compatibilidade com as rotas existentes.
 * O gerenciamento real de schemas e repositórios foi modularizado.
 */
export const dbManager = {
    /**
     * Inicializa a infraestrutura de dados.
     * Delegado para o SchemaBootstrapper.
     */
    async init() {
        return await SchemaBootstrapper.run();
    },

    // Acesso direto aos gerenciadores de dados via delegação (Hub de Dados)
    ...CentralizadorDeGerenciadoresDeDados
};
