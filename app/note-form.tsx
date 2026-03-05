import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { api } from "../src/services/api";
import { Screen } from "../src/components/Screen";
import { TextField } from "../src/components/TextField";
import { PrimaryButton } from "../src/components/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../src/utils/theme";

const CATEGORIES = ["Work", "Study", "Personal", "Ideas"] as const;

export default function NoteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Work");
    const [loading, setLoading] = useState(false);

    async function onSave() {
        const t = title.trim();
        const c = content.trim();

        if (t.length < 2) return Alert.alert("Error", "Title too short");
        if (c.length < 2) return Alert.alert("Error", "Content too short");

        setLoading(true);
        try {
            await api.post("/notes", { title: t, content: c, category });
            Alert.alert("Saved", "Note saved successfully");
            router.replace("/notes");
        } catch (e: any) {
            const msg = e?.response?.data?.error || "Failed to save note";
            Alert.alert("Error", msg);
        } finally {
            setLoading(false);
        }
    }

    const getCategoryIcon = (c: string) => {
        switch (c) {
            case "Work": return "briefcase-outline";
            case "Study": return "book-outline";
            case "Personal": return "person-outline";
            case "Ideas": return "bulb-outline";
            default: return "document-text-outline";
        }
    };

    return (
        <Screen>
            <View style={styles.header}>
                <Ionicons name="document-text" size={32} color={theme.colors.primary} />
                <Text style={styles.title}>New Note</Text>
            </View>

            <TextField
                label="Title"
                placeholder="Note title"
                value={title}
                onChangeText={setTitle}
            />

            <TextField
                label="Content"
                placeholder="Write your note here..."
                value={content}
                onChangeText={setContent}
                multiline
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerIconWrap}>
                    <Ionicons name={getCategoryIcon(category) as any} size={24} color={theme.colors.primary} />
                </View>
                <Picker
                    selectedValue={category}
                    onValueChange={(v) => setCategory(v)}
                    style={styles.picker}
                    dropdownIconColor={theme.colors.text}
                >
                    {CATEGORIES.map((c) => (
                        <Picker.Item key={c} label={c} value={c} color={theme.colors.text} />
                    ))}
                </Picker>
            </View>

            <View style={styles.btnContainer}>
                <PrimaryButton title="Save Note" onPress={onSave} isLoading={loading} iconName="save-outline" />
                <PrimaryButton
                    title="Cancel"
                    variant="secondary"
                    onPress={() => router.back()}
                    style={{ marginTop: theme.spacing.md }}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.sm,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text
    },
    label: {
        ...theme.typography.captionMedium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        marginLeft: theme.spacing.xs,
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.card,
        overflow: "hidden"
    },
    pickerIconWrap: {
        paddingHorizontal: theme.spacing.md,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
    },
    picker: {
        flex: 1,
        height: 58,
        backgroundColor: "transparent",
    },
    btnContainer: {
        marginTop: theme.spacing.lg
    },
});