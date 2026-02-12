
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { groupService } from '../services/groupService';
import { ProviderSettingsModal } from '../components/financial/ProviderSettingsModal';
import { paypalService } from '../services/paypalService';
import { stripeService } from '../services/stripeService';
import { syncPayService } from '../services/syncPayService';
import { PaymentProviderConfig, Group } from '../types';

interface ProviderData {
    id: string;
    name: string;
    icon: string;
    status: 'active' | 'coming_soon';
    methods: { type: 'pix' | 'card'; label: string }[];
}

export const ProviderConfig: React.FC = () => {
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();
    
    const [group, setGroup] = useState<Group | null>(null);
    const [activeProvider, setActiveProvider] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const providers: ProviderData[] = useMemo(() => [
        { id: 'syncpay', name: 'SyncPay', icon: 'fa-bolt', status: 'active', methods: [{ type: 'pix', label: 'PIX' }] },
        { id: 'stripe', name: 'Stripe', icon: 'fa-brands fa-stripe', status: 'active', methods: [{ type: 'card', label: 'Cartão' }] },
        { id: 'paypal', name: 'PayPal', icon: 'fa-brands fa-paypal', status: 'active', methods: [{ type: 'pix', label: 'PIX' }, { type: 'card', label: 'Cartão' }] },
    ], []);

    useEffect(() => {
        if (groupId) {
            const currentGroup = groupService.getGroupById(groupId);
            if (currentGroup) {
                setGroup(currentGroup);
                if (currentGroup.paymentConfig?.isConnected) {
                    setActiveProvider(currentGroup.paymentConfig.providerId);
                }
            }
        }
    }, [groupId]);

    const onConnect = async (providerId: string, credentials: any) => {
        if (!groupId) return;
        try {
            const serviceMap = {
                paypal: () => paypalService.authenticate(credentials.clientId, credentials.clientSecret),
                stripe: () => stripeService.authenticate(credentials.secretKey),
                syncpay: () => syncPayService.authenticate(credentials.clientId, credentials.clientSecret),
            };
            await serviceMap[providerId]();

            const newConfig: PaymentProviderConfig = {
                providerId,
                isConnected: true,
                clientId: credentials.clientId,
                clientSecret: credentials.secretKey || credentials.clientSecret, 
            };

            await groupService.updateGroupPaymentConfig(groupId, newConfig);
            setActiveProvider(providerId);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Connection failed:", error);
            throw error;
        }
    };

    const onUpdate = async (providerId: string, credentials: any) => {
        // A lógica de atualização é a mesma da conexão, substituindo as credenciais.
        return onConnect(providerId, credentials);
    };

    const onDisconnect = async (providerId: string) => {
        if (!groupId) return;
        try {
            const serviceMap = {
                paypal: paypalService.disconnect,
                stripe: stripeService.disconnect,
                syncpay: syncPayService.disconnect,
            };
            await serviceMap[providerId]();

            const disconnectedConfig: PaymentProviderConfig = {
                providerId,
                isConnected: false,
                clientId: undefined,
                clientSecret: undefined,
                token: undefined,
            };

            await groupService.updateGroupPaymentConfig(groupId, disconnectedConfig);
            setActiveProvider(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Disconnection failed:", error);
            throw error;
        }
    };

    const handleBack = () => navigate(-1);

    const renderProviderCard = (provider: ProviderData) => (
        <div key={provider.id} className="provider-card" onClick={() => setIsModalOpen(true)}>
            <div className="provider-icon"><i className={`fa-solid ${provider.icon}`}></i></div>
            <div className="provider-name">{provider.name}</div>
            {activeProvider === provider.id && <div className="active-indicator">Ativo</div>}
        </div>
    );

    return (
        <div className="provider-config-page">
            <header>
                <button onClick={handleBack}><i className="fa-solid fa-arrow-left"></i></button>
                <h1>Provedores de Pagamento</h1>
            </header>
            <main>
                {providers.map(renderProviderCard)}
            </main>
            {group && (
                <ProviderSettingsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConnect={onConnect}
                    onUpdate={onUpdate}
                    onDisconnect={onDisconnect}
                    activeProvider={activeProvider}
                    providers={providers}
                    group={group}
                />
            )}
        </div>
    );
};
