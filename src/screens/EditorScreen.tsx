import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { ReplicateService } from "../services/replicateService";
import { ImageService } from "../services/imageService";
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

    // Testar conexão ao montar
    useEffect(() => {
        testAPIConnection();
    }, []);

    const testAPIConnection = async () => {
        try {
            const isConnected = await ReplicateService.testConnection();
            if (!isConnected) {
                Alert.alert(
                    'Aviso',
                    'Não foi possível conectar à API Replicate. Verifique seu token.'
                );
            }
        } catch (error) {
            console.log('Connection test skipped');
        }
    };

    const processImage = async () => {
        if (!prompt.trim()) {
            Alert.alert('Atenção', 'Digite um prompt para processar a imagem!');
            return;
        }

        setIsProcessing(true);
        setProgress('Preparando imagem...');

        try {
            // Converter imagem para base64
            setProgress('Convertendo imagem...');
            const base64Image = await ImageService.convertImageToBase64(imageUri);

            console.log('📸 Imagem convertida, tamanho:', base64Image.length);

            // Processar com Replicate (img2img)
            setProgress('Enviando para IA...');
            const resultUrl = await ReplicateService.img2img(base64Image, prompt);

            console.log('🎨 URL do resultado:', resultUrl);

            // Baixar imagem resultado
            setProgress('Baixando resultado...');
            const localUri = await ImageService.downloadImage(resultUrl);

            setResultImage(localUri);
            setProgress('');
            Alert.alert('Sucesso! 🎉', 'Imagem processada com sucesso!');
        } catch (error: any) {
            console.error('❌ Error processing image:', error);

            let errorMessage = 'Falha ao processar imagem.';

            if (error.message.includes('401')) {
                errorMessage = 'Token da API inválido. Verifique seu REPLICATE_API_TOKEN.';
            } else if (error.message.includes('timeout')) {
                errorMessage = 'Processamento demorou muito. Tente novamente.';
            } else if (error.message.includes('network')) {
                errorMessage = 'Erro de conexão. Verifique sua internet.';
            }

            Alert.alert('Erro', errorMessage);
            setProgress('');
        } finally {
            setIsProcessing(false);
        }
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
                        <TouchableOpacity onPress={onBack} style={tw`p-2`}>
                            <Text style={tw`text-white text-lg font-semibold`}>
                                ← Voltar
                            </Text>
                        </TouchableOpacity>
                        <Text style={tw`flex-1 text-white text-2xl font-bold text-center mr-16`}>
                            Editor de IA
                        </Text>
                    </View>

                    {/* Original Image */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-white text-lg font-bold mb-3`}>
                            Imagem Original
                        </Text>
                        <Image
                            source={{ uri: imageUri }}
                            style={tw`w-full h-80 rounded-2xl`}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Prompt Input */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-white text-lg font-bold mb-3`}>
                            Descreva a transformação
                        </Text>
                        <TextInput
                            style={tw`bg-white/20 rounded-2xl p-4 text-white text-base min-h-32 border border-white/30`}
                            placeholder="Ex: Transforme em estilo artístico impressionista com cores vibrantes..."
                            placeholderTextColor={"#ddd"}
                            multiline
                            numberOfLines={4}
                            value={prompt}
                            onChangeText={setPrompt}
                            textAlignVertical="top"
                            editable={!isProcessing}
                        />
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
                                ✨ Processar com IA
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
                            <TouchableOpacity
                                style={tw`bg-white/20 rounded-full py-4 items-center border-2 border-white`}
                            >
                                <Text style={tw`text-white text-lg font-bold`}>
                                    💾 Salvar Imagem
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};
