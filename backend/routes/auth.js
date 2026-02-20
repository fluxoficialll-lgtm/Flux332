
import express from 'express';
import { dbManager } from '../databaseManager.js';
import { googleAuthConfig } from '../authConfig.js';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

const router = express.Router();
const client = new OAuth2Client(googleAuthConfig.clientId);

router.get('/config', (req, res) => {
    res.json({ clientId: googleAuthConfig.clientId });
});

router.post('/register', async (req, res) => {
    const { email } = req.body;
    console.log(`[AUTH] Registration attempt for email: ${email}`);

    try {
        const user = req.body;
        if (user.referredById === "") user.referredById = null;
        const userId = await dbManager.users.create(user);

        console.log(`[AUTH] Registration successful for email: ${email}, userId: ${userId}`);
        res.json({ success: true, user: { ...user, id: userId } });
    } catch (e) { 
        console.error(`[AUTH] Registration failed for email: ${email}`, e);
        res.status(500).json({ error: e.message }); 
    }
});

router.post('/login', async (req, res) => {
    const { email } = req.body;
    console.log(`[AUTH] Login attempt for email: ${email}`);

    try {
        const { password } = req.body;
        const user = await dbManager.users.findByEmail(email);

        // Atenção: a verificação de senha deve ser feita com hash em um app real
        if (user && user.password === password) {
            console.log(`[AUTH] Login successful for email: ${email}, userId: ${user.id}`);
            res.json({ user, token: 'session_' + crypto.randomUUID() });
        } else {
            console.warn(`[AUTH] Invalid credentials for email: ${email}`);
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (e) { 
        console.error(`[AUTH] Login failed for email: ${email}`, e);
        res.status(500).json({ error: e.message }); 
    }
});

router.post('/google', async (req, res) => {
    console.log(`[AUTH] Google auth attempt. Token provided: ${!!req.body.googleToken}`);

    try {
        const { googleToken, referredBy } = req.body;
        let googleId, email, name;

        if (googleAuthConfig.clientId !== "GOOGLE_CLIENT_ID_NAO_CONFIGURADO" && googleToken && googleToken.length > 50) {
            try {
                const ticket = await client.verifyIdToken({ idToken: googleToken, audience: googleAuthConfig.clientId });
                const payload = ticket.getPayload();
                googleId = payload['sub']; 
                email = payload['email']; 
                name = payload['name'];
            } catch (err) {
                console.warn("[AUTH] Google token verification failed", err);
            }
        }

        if (!googleId) {
            return res.status(400).json({ error: "Invalid or missing Google token" });
        }

        let user = await dbManager.users.findByGoogleId(googleId);
        let isNew = false;

        if (!user) {
            const existingByEmail = await dbManager.users.findByEmail(email);
            if (existingByEmail) {
                // Associa a conta Google a um usuário existente com o mesmo email
                user = { ...existingByEmail, googleId };
                await dbManager.users.update({ id: user.id, googleId });
                console.log(`[AUTH] Associated Google account for user: ${user.id}, email: ${email}`);
            } else {
                // Cria um novo usuário
                isNew = true;
                const newUser = { 
                    email: email.toLowerCase().trim(), 
                    googleId,
                    name: name || 'Usuário Flux',
                    username: `user_${crypto.randomUUID().substring(0, 8)}`,
                    referredById: referredBy || null,
                };
                const userId = await dbManager.users.create(newUser);
                user = { ...newUser, id: userId };
                console.log(`[AUTH] New user created via Google: ${userId}, email: ${email}`);
            }
        }

        console.log(`[AUTH] Google auth successful for user: ${user.id}, email: ${user.email}, isNew: ${isNew}`);
        res.json({ user, token: 'g_session_' + crypto.randomUUID(), isNew });

    } catch (e) { 
        console.error("[AUTH] Google auth failed", e);
        res.status(500).json({ error: "Erro na autenticação com Google." }); 
    }
});

export default router;
