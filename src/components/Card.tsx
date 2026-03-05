import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../utils/theme";

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
    return <View style={[styles.card, theme.shadows.subtle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radii.lg,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
});
