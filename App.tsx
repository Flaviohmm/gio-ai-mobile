import React, { useState } from 'react';
import {
  StyleSheet,
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

// Ícones simulados com emojis (no projeto real, use @expo/vector-icons)
const FeatureIcon = ({ emoji }: { emoji: string }) => (
  <Text style={styles.featureIcon}>{emoji}</Text>
);

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
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          style={styles.editorContainer}
        >
          <ScrollView contentContainerStyle={styles.editorScroll}>
            <View style={styles.editorHeader}>
              <TouchableOpacity onPress={resetEditor} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </TouchableOpacity>
              <Text style={styles.editorTitle}>Editor de IA</Text>
            </View>

            {selectedImage && (
              <View style={styles.imagePreviewContainer}>
                <Text style={styles.sectionTitle}>Imagem Original</Text>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              </View>
            )}

            <View style={styles.promptContainer}>
              <Text style={styles.sectionTitle}>Descreva a transformação</Text>
              <TextInput
                style={styles.promptInput}
                placeholder="Ex: Transforme em estilo artístico impressionista com cores vibrantes..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={prompt}
                onChangeText={setPrompt}
              />
            </View>

            <TouchableOpacity
              style={[styles.processButton, isProcessing && styles.processButtonDisabled]}
              onPress={processImage}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.processButtonText}>✨ Processar com IA</Text>
              )}
            </TouchableOpacity>

            {resultImage && !isProcessing && (
              <View style={styles.resultContainer}>
                <Text style={styles.sectionTitle}>Resultado</Text>
                <Image source={{ uri: resultImage }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>💾 Salvar Imagem</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Gio_AI</Text>
            <Text style={styles.heroSubtitle}>
              Transforme suas fotos com Inteligência Artificial
            </Text>
            <Text style={styles.heroDescription}>
              Troque roupas, mude cenários e aplique estilos artísticos com apenas um prompt
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={pickImage}>
              <Text style={styles.primaryButtonText}>📷 Escolher Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
              <Text style={styles.secondaryButtonText}>📸 Tirar Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Funcionalidades</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <FeatureIcon emoji={feature.emoji} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Criado por Flavio Macedo • MIT License © 2025
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  // Editor Styles
  editorContainer: {
    flex: 1,
  },
  editorScroll: {
    padding: 20,
    paddingBottom: 40,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  editorTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginRight: 60,
  },
  imagePreviewContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  promptContainer: {
    marginBottom: 24,
  },
  promptInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  processButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  processButtonDisabled: {
    opacity: 0.6,
  },
  processButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});