import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { api } from "../src/services/api";
import { Screen } from "../src/components/Screen";
import { TextField } from "../src/components/TextField";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { theme } from "../src/utils/theme";

export default function Register() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    function isValidMobile(m: string) {
        return /^07\d{8}$/.test(m.trim());
    }

    async function onRegister() {
        const n = name.trim();
        const m = mobile.trim();

        if (n.length < 2) return Alert.alert("Error", "Name is too short");
        if (!isValidMobile(m)) return Alert.alert("Error", "Mobile must be 10 digits and start with 07");
        if (password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters");
        if (password !== confirm) return Alert.alert("Error", "Passwords do not match");

        setLoading(true);
        try {
            await api.post("/auth/register", { name: n, mobile: m, password });
            Alert.alert("Success", "Account created. Please login.");
            router.replace("/login");
        } catch (e: any) {
            const msg = e?.response?.data?.error || "Register failed";
            Alert.alert("Error", msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Screen centered>
            <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Start taking better notes today</Text>
            </View>

            <TextField label="Full Name" placeholder="Enter your full name" value={name} onChangeText={setName} />
            <TextField label="Mobile Number" placeholder="07xxxxxxxx" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
            <TextField label="Password" placeholder="Create a password" value={password} onChangeText={setPassword} isPassword />
            <TextField label="Confirm Password" placeholder="Confirm your password" value={confirm} onChangeText={setConfirm} isPassword />

            <View style={styles.btnContainer}>
                <PrimaryButton title="Create Account" onPress={onRegister} isLoading={loading} />
                <PrimaryButton
                    title="Back to Login"
                    variant="outline"
                    onPress={() => router.replace("/login")}
                    style={{ marginTop: theme.spacing.md }}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: { marginBottom: theme.spacing.xl, alignItems: "center" },
    title: { ...theme.typography.h1, color: theme.colors.text, marginBottom: theme.spacing.xs },
    subtitle: { ...theme.typography.body, color: theme.colors.textSecondary },
    btnContainer: { marginTop: theme.spacing.xl },
});