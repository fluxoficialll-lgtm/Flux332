#!/usr/bin/env bash
# exit on error
set -o errexit

# Instala as dependências
npm install

# Gera o build do frontend
npm run build

# O script de migração foi movido para a inicialização do server.js
# node scripts/executar-migracoes.js 
