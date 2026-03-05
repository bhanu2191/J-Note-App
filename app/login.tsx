import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../src/services/api";
import { Screen } from "../src/components/Screen";
import { TextField } from "../src/components/TextField";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { theme } from "../src/utils/theme";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);

    async function onLogin() {
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { mobile, password });
            const { token, userId, name } = res.data;

            if (rememberMe) {
                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("user", JSON.stringify({ userId, name, mobile }));
            } else {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("user");
            }

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            router.replace("/notes");
        } catch (e: any) {
            const msg = e?.response?.data?.error || "Login failed.";
            Alert.alert("Error", msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Screen centered>
            <View style={styles.header}>
                <Text style={styles.title}>J-Note</Text>
                <Text style={styles.subtitle}>Welcome back!</Text>
            </View>

            <TextField
                label="Mobile Number"
                placeholder="07xxxxxxxx"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
            />

            <TextField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                isPassword
            />

            <Pressable style={styles.checkboxRow} onPress={() => setRememberMe((v) => !v)}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxOn]} />
                <Text style={styles.checkboxText}>Remember Me</Text>
            </Pressable>

            <View style={styles.btnContainer}>
                <PrimaryButton title="Login" onPress={onLogin} isLoading={loading} />
                <PrimaryButton
                    title="Create Account"
                    variant="outline"
                    onPress={() => router.push("/register")}
                    style={{ marginTop: theme.spacing.md }}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: { marginBottom: theme.spacing.xl, alignItems: "center" },
    title: { ...theme.typography.h1, color: theme.colors.primary, marginBottom: theme.spacing.xs },
    subtitle: { ...theme.typography.body, color: theme.colors.textSecondary },
    checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.xl },
    checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 4, marginRight: 10 },
    checkboxOn: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
    checkboxText: { ...theme.typography.bodyMedium, color: theme.colors.text },
    btnContainer: { marginTop: theme.spacing.lg },
});