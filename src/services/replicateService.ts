import { REPLICATE_API_TOKEN } from '@env';

export class ReplicateService {
    private static baseUrl = 'https://api.replicate.com/v1';

    static async img2img(imageBase64: string, prompt: string): Promise<string> {
        try {
            console.log('🚀 Iniciando processamento...');

            // Criar predição
            const predictionResponse = await fetch(`${this.baseUrl}/predictions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
                    input: {
                        prompt: prompt,
                        image: imageBase64,
                        num_inference_steps: 30,
                        guidance_scale: 7.5,
                        strength: 0.7,
                    },
                }),
            });

            console.log('📡 Status da resposta:', predictionResponse.status);

            if (!predictionResponse.ok) {
                const errorText = await predictionResponse.text();
                console.error('❌ Erro da API:', errorText);
                throw new Error(`API Error: ${predictionResponse.status} - ${errorText}`);
            }

            const prediction = await predictionResponse.json();
            console.log('✅ Predição criada:', prediction.id);

            // Poll até completar
            return await this.pollPrediction(prediction.id);
        } catch (error) {
            console.error('❌ Replicate Error:', error);
            throw error;
        }
    }

    private static async pollPrediction(predictionId: string): Promise<string> {
        const maxAttempts = 60;
        let attempts = 0;

        console.log('⏳ Aguardando processamento...');

        while (attempts < maxAttempts) {
            const response = await fetch(`${this.baseUrl}/predictions/${predictionId}`, {
                headers: {
                    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                    'Accept': 'application/json',
                },
            });

            const prediction = await response.json();

            console.log(`📊 Status (${attempts + 1}/60):`, prediction.status);

            if (prediction.status === 'succeeded') {
                console.log('🎉 Imagem gerada com sucesso!');
                return Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
            }

            if (prediction.status === 'failed') {
                console.error('❌ Falha na predição:', prediction.error);
                throw new Error(`Prediction failed: ${prediction.error || 'Unknown error'}`);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
            attempts++;
        }

        throw new Error('Timeout: Processamento demorou muito tempo');
    }

    // Método alternativo usando SDXL (mais rápido)
    static async generateWithSDXL(prompt: string, imageBase64?: string): Promise<string> {
        try {
            const input: any = {
                prompt: prompt,
                num_inference_steps: 25,
                guidance_scale: 7.5,
            };

            if (imageBase64) {
                input.image = imageBase64;
                input.strength = 0.7;
            }

            const predictionResponse = await fetch(`${this.baseUrl}/predictions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
                    input: input,
                }),
            });

            if (!predictionResponse.ok) {
                throw new Error(`API Error: ${predictionResponse.status}`);
            }

            const prediction = await predictionResponse.json();
            return await this.pollPrediction(prediction.id);
        } catch (error) {
            console.error('SDXL Error:', error);
            throw error;
        }
    }

    static async testConnection(): Promise<boolean> {
        try {
            const response = await fetch('https://api.replicate.com/v1/predictions', {
                headers: {
                    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                },
            });

            console.log('🔑 Token status:', response.status);
            return response.status !== 401;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}