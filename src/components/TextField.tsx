import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

interface TextFieldProps extends TextInputProps {
    label?: string;
    error?: string;
    isPassword?: boolean;
}

export function TextField({
    label,
    error,
    isPassword,
    style,
    ...props
}: TextFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!isPassword);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                    props.multiline && styles.multilineContainer,
                ]}
            >
                <TextInput
                    style={[styles.input, props.multiline && styles.multilineInput, style]}
                    placeholderTextColor={theme.colors.textSecondary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={isPassword && !showPassword}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    label: {
        ...theme.typography.captionMedium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        marginLeft: theme.spacing.xs,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.card,
        minHeight: 52,
    },
    inputFocused: {
        borderColor: theme.colors.primary,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    multilineContainer: {
        minHeight: 120,
        alignItems: "flex-start",
    },
    input: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        ...theme.typography.body,
        color: theme.colors.text,
    },
    multilineInput: {
        textAlignVertical: "top",
    },
    eyeIcon: {
        padding: theme.spacing.md,
    },
    errorText: {
        ...theme.typography.small,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
        marginLeft: theme.spacing.xs,
    },
});
