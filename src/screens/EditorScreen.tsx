import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    Alert,
    Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { AIService } from "../services/aiService";
import { GRADIENT_COLORS } from "../utils/constants";

interface EditorScreenProps {
    imageUri: string;
    onBack: () => void;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({
    imageUri,
    onBack,
}) => {
    const [prompt, setPrompt] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [progress, setProgress] = useState('');


    const processImage = async () => {
        if (!prompt.trim()) {
            Alert.alert('Atenção', 'Digite um prompt para processar a imagem!');
            return;
        }

        setIsProcessing(true);
        setProgress('Preparando imagem...');

        try {
            // IMPORTANTE: HuggingFace gratuito não tem img2img
            // Então sempre geramos uma nova imagem baseada no prompt
            setProgress('Gerando imagem com IA (5-10s)...');

            const resultUrl = await AIService.generateImage(prompt);

            setResultImage(resultUrl);
            setProgress('');
            Alert.alert('Sucesso! 🎉', 'Imagem processada com sucesso!');
        } catch (error: any) {
            console.error('❌ Error processing image:', error);

            let errorMessage = 'Falha ao processar imagem.';

            if (error.message?.includes('401') || error.message?.includes('403')) {
                errorMessage = 'Token da API inválido. Verifique seu HF_TOKEN no arquivo .env';
            } else if (error.message?.includes('timeout')) {
                errorMessage = 'Processamento demorou muito. Tente novamente.';
            } else if (error.message?.includes('rate limit')) {
                errorMessage = 'Limite de requisições atingido. Aguarde alguns minutos.';
            } else if (error.message?.includes('No Inference Provider')) {
                errorMessage = 'Modelo temporariamente indisponível. Tente novamente em alguns minutos.';
            }

            Alert.alert('Erro', errorMessage);
            setProgress('');
        } finally {
            setIsProcessing(false);
        }
    };

    const clearResult = () => {
        setResultImage(null);
        setPrompt('');
    };

    return (
        <SafeAreaView style={tw`flex-1`} edges={['top']}>
            <LinearGradient colors={[
                GRADIENT_COLORS[0],
                GRADIENT_COLORS[1],
                GRADIENT_COLORS[2]
            ]} style={tw`flex-1`}>
                <ScrollView style={tw`flex-1 px-5 pb-10`}>
                    {/* Header */}
                    <View style={tw`flex-row items-center mb-6 mt-2`}>
                        <TouchableOpacity
                            onPress={onBack}
                            style={tw`p-2`}
                            disabled={isProcessing}
                        >
                            <Text style={tw`text-white text-lg font-semibold`}>
                                ← Voltar
                            </Text>
                        </TouchableOpacity>
                        <Text style={tw`flex-1 text-white text-2xl font-bold text-center mr-16`}>
                            Editor de IA
                        </Text>
                    </View>

                    {/* Provider Info */}
                    <View style={tw`mb-4 bg-blue-500/20 rounded-2xl p-4 border border-blue-400/30`}>
                        <Text style={tw`text-white text-sm font-bold mb-1`}>
                            🤗 HuggingFace - Modelos Gratuitos
                        </Text>
                        <Text style={tw`text-white/90 text-xs`}>
                            FLUX Schnell → SDXL → SD 1.5 (automático)
                        </Text>
                        <Text style={tw`text-white/70 text-xs mt-2`}>
                            💡 Geração pode levar 10-30 segundos
                        </Text>
                    </View>

                    {/* Original Image */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-white text-lg font-bold mb-3`}>
                            Imagem de Referência
                        </Text>
                        <Image
                            source={{ uri: imageUri }}
                            style={tw`w-full h-80 rounded-2xl`}
                            resizeMode="cover"
                        />
                        <Text style={tw`text-white/70 text-xs mt-2 text-center`}>
                            Use esta imagem como inspiração para seu prompt
                        </Text>
                    </View>

                    {/* Prompt Input */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-white text-lg font-bold mb-3`}>
                            Descreva o que deseja gerar
                        </Text>
                        <TextInput
                            style={tw`bg-white/20 rounded-2xl p-4 text-white text-base min-h-32 border border-white/30`}
                            placeholder="Ex: Um gato astronauta flutuando no espaço, arte digital, altamente detalhado, cores vibrantes..."
                            placeholderTextColor={"#ddd"}
                            multiline
                            numberOfLines={4}
                            value={prompt}
                            onChangeText={setPrompt}
                            textAlignVertical="top"
                            editable={!isProcessing}
                        />

                        {/* Sugestões rápidas */}
                        <View style={tw`mt-3 flex-row flex-wrap gap-2`}>
                            <Text style={tw`text-white/70 text-xs w-full mb-1`}>
                                Sugestões rápidas:
                            </Text>
                            {[
                                "arte digital, 4K",
                                "estilo cartoon colorido",
                                "fotorealista",
                                "pintura a óleo",
                                "estilo anime",
                                "cyperpunk neon"
                            ].map((suggestion, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={tw`bg-white/10 px-3 py-1.5 rounded-full border border-white/20`}
                                    onPress={() => setPrompt(prev => prev + (prev ? ', ' : '') + suggestion)}
                                    disabled={isProcessing}
                                >
                                    <Text style={tw`text-white text-xs`}>+ {suggestion}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Process Button */}
                    <TouchableOpacity
                        style={tw`bg-white rounded-full py-4 items-center mb-6 ${isProcessing ? 'opacity-60' : ''
                            }`}
                        onPress={processImage}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <View style={tw`items-center`}>
                                <ActivityIndicator color={"#667eea"} />
                                {progress && (
                                    <Text style={tw`text-[#667eea] text-sm mt-2`}>
                                        {progress}
                                    </Text>
                                )}
                            </View>
                        ) : (
                            <Text style={tw`text-[#667eea] text-lg font-bold`}>
                                ✨ Gerar com IA
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Result */}
                    {resultImage && !isProcessing && (
                        <View style={tw`mt-6`}>
                            <Text style={tw`text-white text-lg font-bold mb-3`}>
                                Resultado
                            </Text>
                            <Image
                                source={{ uri: resultImage }}
                                style={tw`w-full h-80 rounded-2xl mb-4`}
                                resizeMode="cover"
                            />

                            <View style={tw`flex-row gap-3`}>
                                <TouchableOpacity
                                    style={tw`flex-1 bg-white/20 rounded-full py-4 items-center border-2 border-white`}
                                    onPress={() => {
                                        Alert.alert(
                                            'Salvar Imagem',
                                            'Funcionalidade de salvar será implementada em breve!',
                                            [{ text: 'OK' }]
                                        );
                                    }}
                                >
                                    <Text style={tw`text-white text-lg font-bold`}>
                                        💾 Salvar
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={tw`flex-1 bg-white rounded-full py-4 items-center`}
                                    onPress={clearResult}
                                >
                                    <Text style={tw`text-[#667eea] text-lg font-bold`}>
                                        🔄 Nova Imagem
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Tips */}
                    {!resultImage && !isProcessing && (
                        <View style={tw`mt-4 bg-white/10 rounded-2xl p-4`}>
                            <Text style={tw`text-white font-bold mb-2`}>💡 Dicas para melhores resultados:</Text>
                            <Text style={tw`text-white/80 text-sm mb-1`}>• Seja específico e detalhado</Text>
                            <Text style={tw`text-white/80 text-sm mb-1`}>• Adicione estilo artístico (anime, realista, cartoon)</Text>
                            <Text style={tw`text-white/80 text-sm mb-1`}>• Mencione qualidade (4k, alta resolução, detalhado)</Text>
                            <Text style={tw`text-white/80 text-sm mb-1`}>• Use termos em inglês para melhores resultados</Text>
                            <Text style={tw`text-white/80 text-sm`}>• Tempo de geração: ~5-10 segundos</Text>
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};
