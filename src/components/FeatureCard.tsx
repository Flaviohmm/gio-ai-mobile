import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Feature } from "../types";

interface FeatureCardProps {
    feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    return (
        <View style={tw`bg-white/15 rounded-2xl p-6 border border-white/30`}>
            <Text style={tw`text-4xl mb-3`}>{feature.emoji}</Text>
            <Text style={tw`text-white text-xl font-bold mb-2`}>
                {feature.title}
            </Text>
            <Text style={tw`text-white/90 text-sm`}>
                {feature.description}
            </Text>
        </View>
    );
};