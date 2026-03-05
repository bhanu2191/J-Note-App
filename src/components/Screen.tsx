import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    ViewStyle,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../utils/theme";

interface ScreenProps {
    children: React.ReactNode;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    scrollable?: boolean;
    useSafeArea?: boolean;
    centered?: boolean;
}

export function Screen({
    children,
    style,
    contentContainerStyle,
    scrollable = true,
    useSafeArea = true,
    centered = false,
}: ScreenProps) {
    const Container = useSafeArea ? SafeAreaView : View;

    const innerContent = scrollable ? (
        <ScrollView
            contentContainerStyle={[
                styles.scrollContent,
                centered && styles.centeredContent,
                contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[styles.inner, centered && styles.centeredContent, contentContainerStyle]}>
            {children}
        </View>
    );

    return (
        <Container style={[styles.container, style]}>
            <KeyboardAvoidingView
                style={styles.keyboardAware}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {innerContent}
            </KeyboardAvoidingView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    keyboardAware: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: theme.spacing.lg,
    },
    inner: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    centeredContent: {
        justifyContent: "center",
    },
});
