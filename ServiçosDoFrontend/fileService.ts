
import { API_BASE } from './ServiçosDeApi/apiConfig';

// Este é um cliente de API simplificado para uploads de arquivos.
// O fluxClient principal é otimizado para JSON, então um manipulador separado para multipart/form-data é mais limpo.

const upload = async (file: Blob, path: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const userToken = localStorage.getItem('auth_token');
    const headers = new Headers();
    if (userToken) {
        headers.set('Authorization', `Bearer ${userToken}`);
    }

    try {
        const response = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData,
            headers: headers,
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Erro no upload do arquivo' }));
            throw new Error(err.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.url) {
            throw new Error('A resposta da API de upload não contém uma URL.');
        }
        
        return result.url;
    } catch (error) {
        console.error('Falha no serviço de upload:', error);
        throw error;
    }
};

export const fileService = {
    upload,
};
