import axios from 'axios';
import { CepResponse } from '@/models/CepResponse.interface';

export async function checkCep(cep: string): Promise<CepResponse | null> {
    try {
        // Fazendo a requisição para a API ViaCEP
        const response = await axios.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.log("Erro ao verificar CEP:", error);
        return null;
    }
}
