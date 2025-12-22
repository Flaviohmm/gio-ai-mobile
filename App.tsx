import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { HomeScreen } from "./src/screens/HomeScreen";
import { EditorScreen } from "./src/screens/EditorScreen";
import { ScreenType } from "./src/types";
import tw from "twrnc";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'É necessário permitir acesso à galeria!');
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
      Alert.alert('Permissão necessária', 'É necessário permitir acesso à câmera!');
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

  const handleBack = () => {
    setSelectedImage(null);
    setCurrentScreen('home');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {currentScreen === 'home' ? (
        <HomeScreen onPickImage={pickImage} onTakePhoto={takePhoto} />
      ) : (
        <EditorScreen imageUri={selectedImage!} onBack={handleBack} />
      )}
    </SafeAreaProvider>
  );
}
