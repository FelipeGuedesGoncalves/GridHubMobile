import { FuncaoUtilizada } from "./FuncaoUtilizada.interface";

export interface AnaliseData {
    atividadesConcluidas: string;
    atividadesInacabadas: string;
    funcoesMaisUtilizadas: FuncaoUtilizada;
    utilizacaoDeFuncoes: {
        funcoesUtilizadas: string;
        funcoesNaoUtilizadas: string;
    };
    tempoInatividade: string;
}