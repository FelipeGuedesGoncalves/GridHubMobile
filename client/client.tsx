// client.tsx
import axios from 'axios';
import { CnpjResponse } from '@/models/CnpjResponse.interface';

export async function checkCnpj(cnpj: string): Promise<CnpjResponse | null> {
    try {
        const response = await axios.get<CnpjResponse>(`https://open.cnpja.com/office/${cnpj}`);
        return response.data;
    } catch (error) {
        console.log("Erro ao verificar CNPJ:", error);
        return null;
    }
}
