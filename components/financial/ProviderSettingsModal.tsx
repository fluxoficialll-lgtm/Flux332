
import React, { useState, useEffect } from 'react';

interface ProviderSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (provider: string, credentials: any) => Promise<void>;
    onUpdate: (provider: string, credentials: any) => Promise<void>;
    onDisconnect: (provider: string) => Promise<void>;
    activeProvider: string | null;
    providers: { id: string, name: string }[];
}

export const ProviderSettingsModal: React.FC<ProviderSettingsModalProps> = ({ 
    isOpen, 
    onClose, 
    onConnect,
    onUpdate,
    onDisconnect,
    activeProvider,
    providers 
}) => {
    const [credentials, setCredentials] = useState<any>({});
    const [selectedProvider, setSelectedProvider] = useState<string | null>(activeProvider);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setSelectedProvider(activeProvider);
    }, [activeProvider]);

    const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProvider) return;

        setIsLoading(true);
        setError(null);
        try {
            if (activeProvider === selectedProvider) {
                await onUpdate(selectedProvider, credentials);
            } else {
                await onConnect(selectedProvider, credentials);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "Falha ao processar. Verifique suas credenciais.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDisconnect = async () => {
        if (!activeProvider) return;

        setIsLoading(true);
        setError(null);
        try {
            await onDisconnect(activeProvider);
            onClose();
        } catch (err: any) {
            setError(err.message || "Falha ao desconectar.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderFields = () => {
        switch (selectedProvider) {
            case 'syncpay':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="clientId">Client ID</label>
                            <input type="text" id="clientId" name="clientId" onChange={handleCredentialChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="clientSecret">Client Secret</label>
                            <input type="password" id="clientSecret" name="clientSecret" onChange={handleCredentialChange} />
                        </div>
                    </>
                );
            case 'stripe':
                return (
                    <div className="input-group">
                        <label htmlFor="secretKey">Secret Key</label>
                        <input type="password" id="secretKey" name="secretKey" onChange={handleCredentialChange} />
                    </div>
                );
            case 'paypal':
                return (
                    <>
                        <div className="input-group">
                            <label htmlFor="clientId">Client ID</label>
                            <input type="text" id="clientId" name="clientId" onChange={handleCredentialChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="clientSecret">Client Secret</label>
                            <input type="password" id="clientSecret" name="clientSecret" onChange={handleCredentialChange} />
                        </div>
                    </>
                );
            default:
                return <p>Selecione um provedor para começar.</p>;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Configurar Gateway de Pagamento</h2>
                
                <div className="provider-selection">
                    {providers.map(p => (
                        <button 
                            key={p.id}
                            className={`provider-btn ${selectedProvider === p.id ? 'active' : ''}`}
                            onClick={() => setSelectedProvider(p.id)}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>

                {selectedProvider && (
                    <form onSubmit={handleSubmit}>
                        {renderFields()}
                        {error && <p className="error-message">{error}</p>}
                        
                        <div className="form-actions">
                            <button type="submit" className="connect-button" disabled={isLoading}>
                                {isLoading ? 'Processando...' : (activeProvider === selectedProvider ? 'Atualizar' : 'Conectar')}
                            </button>
                            {activeProvider === selectedProvider && (
                                <button type="button" className="disconnect-button" onClick={handleDisconnect} disabled={isLoading}>
                                    Desconectar
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
