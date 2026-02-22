
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { groupService } from '../ServiçosDoFrontend/groupService';
import { authService } from '../ServiçosDoFrontend/ServiçosDeAutenticacao/authService';
import { RedirectResolver } from '../ServiçosDoFrontend/sync/RedirectResolver';
import { PurchaseIntention } from '../ServiçosDoFrontend/sync/PurchaseIntention';
import { db } from '../database';

export const useSuccessBridge = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [status, setStatus] = useState<'validating' | 'ready' | 'error'>('validating');
    const [message, setMessage] = useState('Validando transação...');
    const [group, setGroup] = useState<any>(null);

    const checkAccess = useCallback(async () => {
        if (!id) return;
        
        const userId = authService.getCurrentUserId();
        if (!userId) {
            PurchaseIntention.set(id);
            navigate('/register');
            return;
        }

        try {
            const foundGroup = await groupService.fetchGroupById(id);
            if (!foundGroup) throw new Error("Grupo não encontrado");
            setGroup(foundGroup);

            const isVipActive = db.vipAccess.check(userId, id);
            
            if (isVipActive) {
                setStatus('ready');
                setMessage('Acesso Liberado!');
                PurchaseIntention.clear();
            } else {
                const steps = [
                    "Sincronizando banco de dados...",
                    "Preparando sua licença VIP...",
                    "Configurando canais de conteúdo...",
                    "Quase pronto..."
                ];
                setMessage(steps[Math.floor(Math.random() * steps.length)]);
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
            setMessage('Falha ao validar acesso.');
        }
    }, [id, navigate]);

    useEffect(() => {
        const interval = setInterval(checkAccess, 2500);
        checkAccess();
        return () => clearInterval(interval);
    }, [checkAccess]);

    const handleEnter = () => {
        if (group) {
            const path = RedirectResolver.resolveGroupEntryPath(group);
            navigate(path, { replace: true });
        }
    };

    return { status, message, handleEnter };
};
