import React from "react";
import { View, Text } from "react-native";
import tw from 'twrnc';

export const HeroSection: React.FC = () => {
    return (
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
    );
};
