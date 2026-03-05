import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    style?: StyleProp<ViewStyle>;
}

export function Checkbox({ checked, onChange, label, style }: CheckboxProps) {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={() => onChange(!checked)}
            activeOpacity={0.7}
        >
            <View style={[
                styles.checkbox,
                checked && styles.checkboxChecked
            ]}>
                {checked && <Ionicons name="checkmark" size={16} color="#FFF" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: theme.radii.sm,
        borderWidth: 2,
        borderColor: theme.colors.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    checkboxChecked: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    label: {
        marginLeft: theme.spacing.sm,
        ...theme.typography.body,
        color: theme.colors.text,
    }
});
