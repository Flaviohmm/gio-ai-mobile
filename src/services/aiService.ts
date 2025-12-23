import { HuggingFaceService } from "./huggingFaceService";
import { ReplicateService } from "./replicateService";

// Configuração: escolha qual o serviço usar
export enum AIProvider {
    HUGGINGFACE = 'huggingface',
    REPLICATE = 'replicate',
}

// Configurar aqui qual provider usar
const CURRENT_PROVIDER = AIProvider.HUGGINGFACE;

export class AIService {
    /**
     * Transforma imagem com IA baseado no provider configurado
     */
    static async transformImage(imageBase64: string, prompt: string): Promise<string> {
        switch (CURRENT_PROVIDER) {
            case AIProvider.HUGGINGFACE:
                return await HuggingFaceService.imageToImage(imageBase64, prompt);
            default:
                throw new Error('Provider não configurado')
        }
    }

    /**
     * Gera nova imagem do zero a partir de texto
     */
    static async generateImage(prompt: string): Promise<string> {
        switch (CURRENT_PROVIDER) {
            case AIProvider.HUGGINGFACE:
                return await HuggingFaceService.textToImage(prompt);
            default:
                throw new Error('Provider não configurado');
        }
    }

    /**
     * Retorna o provider atual
     */
    static getCurrentProvider(): string {
        return CURRENT_PROVIDER;
    }
}
