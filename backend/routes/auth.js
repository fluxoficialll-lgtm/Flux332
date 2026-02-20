
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CentralizadorDeGerenciadoresDeDados } from '../database/CentralizadorDeGerenciadoresDeDados.js';
import { gerarId, ID_PREFIX } from '../services/ServiçoGeracaoDe.IDs.js';

const router = express.Router();

// Rota de Registro
router.post('/register', async (req, res) => {
    const { name, username, email, password, dateOfBirth, googleId } = req.body;

    try {
        // Verifica se o email ou username já existem
        if (await CentralizadorDeGerenciadoresDeDados.users.findByEmail(email)) {
            return res.status(409).json({ message: 'O e-mail fornecido já está em uso.' });
        }
        if (await CentralizadorDeGerenciadoresDeDados.users.findByUsername(username)) {
            return res.status(409).json({ message: 'O nome de usuário já está em uso.' });
        }

        // Gera um ID de usuário seguro e prefixado
        const novoUsuarioId = gerarId(ID_PREFIX.USUARIO);

        // Hash da senha se o registro não for via Google
        const passwordHash = password ? await bcrypt.hash(password, 10) : null;

        // Cria o novo objeto de usuário com o ID gerado
        const newUser = {
            id: novoUsuarioId,
            name,
            username,
            email,
            passwordHash,
            dateOfBirth,
            googleId
        };

        // Salva o usuário no banco de dados
        await CentralizadorDeGerenciadoresDeDados.users.create(newUser);

        // Gera o token JWT
        const token = jwt.sign({ userId: novoUsuarioId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            message: 'Usuário registrado com sucesso!', 
            token, 
            userId: novoUsuarioId 
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Ocorreu um erro inesperado durante o registro.' });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await CentralizadorDeGerenciadoresDeDados.users.findByEmail(email);
        if (!user || !user.passwordHash) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido!', token, userId: user.id });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Ocorreu um erro inesperado durante o login.' });
    }
});

// Rota de autenticação com Google
router.post('/auth/google', async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await CentralizadorDeGerenciadoresDeDados.users.findByGoogleId(googleId);

        if (!user) {
            // Se não encontrar por Google ID, tenta por e-mail para vincular contas
            user = await CentralizadorDeGerenciadoresDeDados.users.findByEmail(email);

            if (user) {
                // Vincula o Google ID a uma conta de e-mail existente
                user.googleId = googleId;
                await CentralizadorDeGerenciadoresDeDados.users.update(user);
            } else {
                // Cria um novo usuário se não existir nem por Google ID nem por e-mail
                const novoUsuarioId = gerarId(ID_PREFIX.USUARIO);
                const username = email.split('@')[0]; // Gera um username a partir do e-mail
                
                const newUser = {
                    id: novoUsuarioId,
                    googleId,
                    email,
                    name,
                    username,
                    passwordHash: null, // Sem senha, pois é login social
                    dateOfBirth: null // Pode ser solicitado depois
                };

                await CentralizadorDeGerenciadoresDeDados.users.create(newUser);
                user = newUser;
            }
        }

        // Gera o token JWT para o usuário encontrado ou criado
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Autenticação com Google bem-sucedida!', token, userId: user.id });

    } catch (error) {
        console.error('Erro na autenticação com Google:', error);
        res.status(500).json({ message: 'Ocorreu um erro inesperado durante a autenticação com o Google.' });
    }
});

export default router;
