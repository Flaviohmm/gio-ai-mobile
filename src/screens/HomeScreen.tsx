import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { HeroSection } from "../components/HeroSection";
import { FeatureCard } from "../components/FeatureCard";
import { features } from "../utils/features";
import { GRADIENT_COLORS } from "../utils/constants";

interface HomeScreenProps {
    onPickImage: () => void;
    onTakePhoto: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
    onPickImage,
    onTakePhoto,
}) => {
    return (
        <LinearGradient colors={[
            GRADIENT_COLORS[0],
            GRADIENT_COLORS[1],
            GRADIENT_COLORS[2]]}
            style={tw`flex-1`}>
            <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-10`}>
                <HeroSection />

                {/* Action Buttons */}
                <View style={tw`px-5 mb-10 gap-3`}>
                    <TouchableOpacity
                        style={tw`bg-white rounded-full py-4 px-8 items-center shadow-lg`}
                        onPress={onPickImage}
                    >
                        <Text style={tw`text-[#667eea] text-lg font-bold`}>
                            📷 Escolher Foto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`bg-white/20 rounded-full py-4 px-8 items-center border-2 border-white`}
                        onPress={onTakePhoto}
                    >
                        <Text style={tw`text-white text-lg font-bold`}>
                            📷 Tirar Foto
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Features */}
                <View style={tw`px-5 mb-10`}>
                    <Text style={tw`text-white text-3xl font-bold text-center mb-8`}>
                        Funcionalidades
                    </Text>

                    <View style={tw`gap-4`}>
                        {features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} />
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
    );
};
