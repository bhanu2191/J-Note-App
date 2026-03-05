import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: "primary" | "secondary" | "outline" | "danger";
    isLoading?: boolean;
    disabled?: boolean;
    iconName?: keyof typeof Ionicons.glyphMap;
}

export function PrimaryButton({
    title,
    onPress,
    style,
    textStyle,
    variant = "primary",
    isLoading = false,
    disabled = false,
    iconName,
}: PrimaryButtonProps) {
    const isOutline = variant === "outline";
    const backgroundColor =
        variant === "primary" ? theme.colors.primary :
            variant === "secondary" ? theme.colors.textSecondary :
                variant === "danger" ? theme.colors.error :
                    "transparent";

    const textColor = isOutline ? theme.colors.text : "#FFFFFF";

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor },
                isOutline && styles.outlineStyle,
                (disabled || isLoading) && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <>
                    {iconName && (
                        <Ionicons name={iconName} size={20} color={textColor} style={styles.icon} />
                    )}
                    <Text style={[styles.text, { color: textColor }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.radii.md,
        minHeight: 52,
    },
    outlineStyle: {
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        ...theme.typography.bodyMedium,
        textAlign: "center",
    },
    icon: {
        marginRight: theme.spacing.sm,
    },
});
