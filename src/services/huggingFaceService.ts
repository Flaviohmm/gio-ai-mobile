import { InferenceClient } from "@huggingface/inference";
import * as FileSystem from "expo-file-system/legacy";
import { HF_TOKEN } from "@env";

export class HuggingFaceService {
    private static client = new InferenceClient(HF_TOKEN);

    /**
     * Gera imagem usando modelos gratuitos do HuggingFace
     */
    static async textToImage(prompt: string): Promise<string> {
        // Lista de modelos gratuitos (sem provider)
        const freeModels = [
            {
                model: "black-forest-labs/FLUX.1-schnell",
                steps: 4,
                name: "FLUX Schnell (Rápido)"
            },
            {
                model: "stabilityai/stable-diffusion-xl-base-1.0",
                steps: 25,
                name: "SDXL"
            },
            {
                model: "runwayml/stable-diffusion-v1-5",
                steps: 20,
                name: "SD 1.5"
            },
        ];

        for (const modelConfig of freeModels) {
            try {
                console.log(`🎨 [HF] Tentando ${modelConfig.name}...`);
                console.log("📝 Prompt:", prompt);

                const image = await this.client.textToImage({
                    model: modelConfig.model,
                    inputs: prompt,
                    parameters: {
                        num_inference_steps: modelConfig.steps,
                    }
                });

                console.log(`✅ [HF] Sucesso com ${modelConfig.name}`);

                // Salvar localmente
                const localUri = await this.convertToLocalUri(image);

                console.log(`🎉 [HF] Sucesso com ${modelConfig.name}!`);
                return localUri;
            } catch (error) {
                console.log(`⚠️ [HF] ${modelConfig.name} falhou, tentando próximo...`);
                console.error('Erro:', error);

                // Se for o último modelo, lance o erro
                if (modelConfig === freeModels[freeModels.length - 1]) {
                    throw new Error(`Todos os modelos falharam. Último erro: ${error}`);
                }
                continue;
            }
        }

        throw new Error('Nenhum modelo disponível');
    }

    /**
     * Transforma imagem existente
     * NOTA: Usa text-to-image porque img2img não está disponível no HF gratuito
     */
    static async imageToImage(imageBase64: string, prompt: string): Promise<string> {
        console.log('🔄 [HF] Gerando imagem baseada no prompt...');
        return await this.textToImage(prompt);
    }

    /**
     * Gera imagem com SDXL (Alta qualidade, mas é mais lento)
     */
    static async generateWithSDXL(prompt: string): Promise<string> {
        try {
            console.log('🎨 Gerando com SDXL...');

            const image = await this.client.textToImage({
                model: "stabilityai/stable-diffusion-xl-base-1.0",
                inputs: prompt,
                parameters: {
                    num_inference_steps: 30,
                    guidance_scale: 7.5,
                },
            });

            const blob = await this.base64ToBlob(image);
            const base64 = await this.blobToBase64(blob);
            const localUri = await this.saveImageLocally(base64);

            console.log('✅ Imagem SDXL gerada!');
            return localUri;
        } catch (error) {
            console.error('❌ SDXL Generation Error:', error);
            throw error;
        }
    }

    /**
     * Melhora qualidade de imagem (Face Restoration)
     */
    static async enhanceImage(imageBase64: string): Promise<string> {
        try {
            console.log('✨ Melhorando qualidade...');

            const blob = await this.base64ToBlob(imageBase64);

            const result = await this.client.imageToImage({
                model: "tencentarc/gfpgan",
                inputs: blob,
            });

            const base64Result = await this.blobToBase64(result);
            const localUri = await this.saveImageLocally(base64Result);

            console.log('✅ Qualidade melhorada!');
            return localUri;
        } catch (error) {
            console.error('❌ Enhancement Error:', error);
            throw error;
        }
    }

    // ============= MÉTODOS AUXILIARES =============

    /**
   * Converte resultado da API (Blob ou string) para URI local
   */
    private static async convertToLocalUri(image: Blob | string): Promise<string> {
        try {
            const filename = `${FileSystem.cacheDirectory}gio_ai_${Date.now()}.jpg`;

            if (image instanceof Blob) {
                console.log('💾 [HF] Convertendo Blob...');

                // Converter Blob para Base64
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const result = reader.result as string;
                        const base64Data = result.split(',')[1];
                        resolve(base64Data);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(image);
                });

                // Salvar
                await FileSystem.writeAsStringAsync(filename, base64, {
                    encoding: FileSystem.EncodingType.Base64,
                });
            } else if (typeof image === 'string') {
                console.log('💾 [HF] Salvando string...');

                // Remover prefixo se existir
                const base64Data = image.includes('base64,')
                    ? image.split('base64,')[1]
                    : image;

                await FileSystem.writeAsStringAsync(filename, base64Data, {
                    encoding: FileSystem.EncodingType.Base64,
                });
            } else {
                throw new Error(`Tipo de imagem desconhecido: ${typeof image}`);
            }

            console.log('💾 [HF] Salvo em:', filename);
            return filename;
        } catch (error) {
            console.error('❌ [HF] Erro ao salvar:', error);
            throw error;
        }
    }

    /**
     * Converte Blob para Base64
     */
    private static blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = (reader.result as string).split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Salva Blob localmente no cache do app
     */
    private static async saveBlobLocally(blob: Blob): Promise<string> {
        try {
            const filename = `${FileSystem.cacheDirectory}gio_ai_${Date.now()}.jpg`;

            // Converter Blob para Base64
            const reader = new FileReader();

            const base64 = await new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    const result = reader.result as string;
                    const base64Data = result.split(',')[1];
                    resolve(base64Data);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            // Salvar no sistema de arquivos
            await FileSystem.writeAsStringAsync(filename, base64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            console.log('💾 [HF] Imagem salva em:', filename);
            return filename;
        } catch (error) {
            console.error('❌ [HF] Erro ao salvar:', error);
            throw error;
        }
    }

    /**
     * Converte Base64 para Blob
     */
    private static async base64ToBlob(base64: string): Promise<Blob> {
        // Remove o prefixo data:image/...;base64 se existir
        const base64Data = base64.includes('base64,')
            ? base64.split('base64,')[1]
            : base64;

        const response = await fetch(`data:image/jpeg;base64,${base64Data}`);
        return await response.blob();
    }

    /**
     * Salva aimagem Base64 localmente
     */
    private static async saveImageLocally(base64: string): Promise<string> {
        const filename = `${FileSystem.cacheDirectory}${Date.now()}.jpg`;

        // Remove prefixo se existir
        const base64Data = base64.includes('base64,')
            ? base64.split('base64,')[1]
            : base64;

        await FileSystem.writeAsStringAsync(filename, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return filename;
    }

    /**
     * Lista modelos disponíveis (para debug)
     */
    static async listAvailableModels(): Promise<void> {
        console.log('📚 Modelos disponíveis:');
        console.log('- Tongyi-MAI/Z-Image-Turbo (Rápido, via Fal.ai)');
        console.log('- stabilityai/stable-diffusion-xl-base-1.0 (Alta qualidade)');
        console.log('- timbrooks/instruct-pix2pix (Image-to-Image)');
        console.log('- tencentarc/gfpgan (Face Enhancement)');
    }
}
