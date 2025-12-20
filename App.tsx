import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

interface Feature {
  emoji: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    emoji: '👕',
    title: 'Troque Roupas',
    description: 'Vista qualquer estilo: casual, social, fantasia ou uniforme com um único prompt.',
  },
  {
    emoji: '🏔️',
    title: 'Mude Cenários',
    description: 'Praia, cidade futurista, estúdio profissional ou floresta. Você escolhe.',
  },
  {
    emoji: '🎨',
    title: 'Estilos Variados',
    description: 'Realista, artístico, cinematográfico ou cartoon. Sua criatividade, seu estilo.',
  },
  {
    emoji: '⚡',
    title: 'Ultra Rápido',
    description: 'Resultados de alta qualidade em segundos. Sem espera, só criação.',
  },
  {
    emoji: '✨',
    title: 'Prompts Simples',
    description: 'Descreva o que imagina e a IA faz acontecer. Simples assim.',
  },
  {
    emoji: '📱',
    title: 'Mobile First',
    description: 'Interface intuitiva otimizada para criar em qualquer lugar.',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'editor'>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É necessária permissão para acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setCurrentScreen('editor');
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É necessária permissão para usar a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setCurrentScreen('editor');
    }
  };

  const processImage = async () => {
    if (!prompt.trim()) {
      Alert.alert('Atenção', 'Digite um prompt para processar a imagem!');
      return;
    }

    setIsProcessing(true);

    // Simulação de processamento de IA (3 segundos)
    // No app real, aqui você faria a chamada para a API de IA
    setTimeout(() => {
      setResultImage(selectedImage); // Simula resultado
      setIsProcessing(false);
      Alert.alert('Sucesso', 'Imagem processada com sucesso! 🎉');
    }, 3000);
  };

  const resetEditor = () => {
    setSelectedImage(null);
    setResultImage(null);
    setPrompt('');
    setCurrentScreen('home');
  };

  if (currentScreen === 'editor') {
    return (
      <SafeAreaView style={tw`flex-1`}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          style={tw`flex-1`}
        >
          <ScrollView style={tw`flex-1 px-5 pb-10`}>
            {/* Header */}
            <View style={tw`flex-row items-center mb-6 mt-2`}>
              <TouchableOpacity onPress={resetEditor} style={tw`p-2`}>
                <Text style={tw`text-white text-lg font-semibold`}>← Voltar</Text>
              </TouchableOpacity>
              <Text style={tw`flex-1 text-white text-2xl font-bold text-center mr-16`}>
                Editor de IA
              </Text>
            </View>

            {/* Image Preview */}
            {selectedImage && (
              <View style={tw`mb-6`}>
                <Text style={tw`text-white text-lg font-bold mb-3`}>
                  Imagem Original
                </Text>
                <Image 
                  source={{ uri: selectedImage }} 
                  style={tw`w-full h-80 rounded-2xl`} 
                  resizeMode='cover'
                />
              </View>
            )}

            {/* Prompt Input */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-white text-lg font-bold mb-3`}>
                Descreva a transformação
              </Text>
              <TextInput
                style={tw`bg-white/20 rounded-2xl p-4 text-white text-base min-h-30 border border-white/30`}
                placeholder="Ex: Transforme em estilo artístico impressionista com cores vibrantes..."
                placeholderTextColor="#ddd"
                multiline
                numberOfLines={4}
                value={prompt}
                onChangeText={setPrompt}
              />
            </View>

            {/* Process Button */}
            <TouchableOpacity
              style={tw`bg-white rounded-full py-4 items-center mb-6 ${
                isProcessing ? 'opacity-60' : ''
              }`}
              onPress={processImage}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#667eea" />
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
                  resizeMode='cover' 
                />
                <TouchableOpacity style={tw`bg-white/20 rounded-full py-4 items-center border-2 border-white`}>
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
  }

  // TELA HOME
  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={tw`flex-1`}
      >
        <ScrollView style={tw`flex-1 pb-10`}>
          {/* Hero Section */}
          <View style={tw`items-center px-5 pt-16 pb-10`}>
            <Text style={tw`text-white text-5xl font-bold mb-4`}>
              Gio AI
            </Text>
            <Text style={tw`text-white text-2xl font-semibold text-center mb-3`}>
              Transforme suas fotos com Inteligência Artificial
            </Text>
            <Text style={tw`text-white/90 text-base text-center`}>
              Troque roupas, mude cenários e aplique estilos artísticos com apenas um prompt
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={tw`px-5 mb-10 gap-3`}>
            <TouchableOpacity 
              style={tw`bg-white rounded-full py-4 px-8 items-center shadow-lg`} 
              onPress={pickImage}
            >
              <Text style={tw`text-[#667eea] text-lg font-bold`}>
                📷 Escolher Foto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={tw`bg-white/20 rounded-full py-4 px-8 items-center border-2 border-white`} 
              onPress={takePhoto}
            >
              <Text style={tw`text-white text-lg font-bold`}>
                📸 Tirar Foto
              </Text>
            </TouchableOpacity>
          </View>

          {/* Features Section */}
          <View style={tw`px-5 mb-10`}>
            <Text style={tw`text-white text-3xl font-bold text-center mb-8`}>
              Funcionalidades
            </Text>
            <View style={tw`gap-4`}>
              {features.map((feature, index) => (
                <View 
                  key={index} 
                  style={tw`bg-white/15 rounded-2xl p-6 border border-white/30`}
                >
                  <Text style={tw`text-4xl mb-3`}>{feature.emoji}</Text>
                  <Text style={tw`text-white text-xl font-bold mb-2`}>
                    {feature.title}
                  </Text>
                  <Text style={tw`text-white/90 text-sm`}>
                    {feature.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={tw`items-center px-5 pt-5`}>
            <Text style={tw`text-white/80 text-sm text-center`}>
              Criado por Flavio Macedo • MIT License © 2025
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
