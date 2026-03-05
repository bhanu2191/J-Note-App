import { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../src/services/api";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../src/components/Screen";
import { TextField } from "../src/components/TextField";
import { ChipRow } from "../src/components/ChipRow";
import { NoteCard } from "../src/components/NoteCard";
import { theme } from "../src/utils/theme";

const CATEGORIES = ["All", "Work", "Study", "Personal", "Ideas"] as const;
type Category = typeof CATEGORIES[number];

type Note = {
    id: number;
    title: string;
    content: string;
    category: string;
    createdAt: string;
};

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [sort, setSort] = useState<"latest" | "oldest">("latest");
    const [category, setCategory] = useState<Category>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [userName, setUserName] = useState("User");
    const [refreshing, setRefreshing] = useState(false);

    const selectedCategory = useMemo(() => (category === "All" ? "" : category), [category]);

    const filteredNotes = useMemo(() => {
        if (!searchQuery.trim()) return notes;
        const lowerQ = searchQuery.toLowerCase();
        return notes.filter(n =>
            n.title.toLowerCase().includes(lowerQ) ||
            n.content.toLowerCase().includes(lowerQ)
        );
    }, [notes, searchQuery]);

    useEffect(() => {
        AsyncStorage.getItem("user").then((userData) => {
            if (userData) {
                const parsed = JSON.parse(userData);
                if (parsed.name) setUserName(parsed.name);
            }
        }).catch(console.error);
    }, []);

    async function loadNotes() {
        setRefreshing(true);
        try {
            const url =
                selectedCategory
                    ? `/notes?sort=${sort}&category=${encodeURIComponent(selectedCategory)}`
                    : `/notes?sort=${sort}`;

            const res = await api.get(url);
            setNotes(res.data);
        } catch (e: any) {
            const msg = e?.response?.data?.error || "Failed to load notes";
            Alert.alert("Error", msg);
        } finally {
            setRefreshing(false);
        }
    }

    async function logout() {
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("user");
                    router.replace("/login");
                }
            }
        ]);
    }

    useEffect(() => {
        loadNotes();
    }, [sort, selectedCategory]);

    return (
        <Screen scrollable={false} contentContainerStyle={{ padding: 0 }}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good Morning,</Text>
                    <Text style={styles.username}>{userName}</Text>
                </View>
                <TouchableOpacity style={styles.profileBtn} onPress={logout}>
                    <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
                </TouchableOpacity>
            </View>

            {/* Controls */}
            <View style={styles.controlsRow}>
                <View style={styles.searchContainer}>
                    <TextField
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{ paddingVertical: 10 }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.sortBtn}
                    onPress={() => setSort(s => s === "latest" ? "oldest" : "latest")}
                >
                    <Ionicons
                        name={sort === "latest" ? "arrow-down" : "arrow-up"}
                        size={16}
                        color={theme.colors.textSecondary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.chipWrapper}>
                <ChipRow
                    categories={CATEGORIES as any}
                    selectedCategory={category}
                    onSelectCategory={(c) => setCategory(c as Category)}
                />
            </View>

            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.listContent}
                refreshing={refreshing}
                onRefresh={loadNotes}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <NoteCard
                        title={item.title}
                        content={item.content}
                        category={item.category}
                        createdAt={item.createdAt}
                        onPress={() => router.push({ pathname: "/note-form", params: { id: String(item.id) } })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={48} color={theme.colors.border} />
                        <Text style={styles.emptyText}>No notes found</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={[styles.fab, theme.shadows.medium]}
                onPress={() => router.push("/note-form")}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={32} color="#FFF" />
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.md,
    },
    greeting: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    username: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    profileBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    controlsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        gap: theme.spacing.md,
    },
    searchContainer: {
        flex: 1,
    },
    sortBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 52,
        height: 52,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chipWrapper: {
        marginBottom: theme.spacing.md,
    },
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 100, // accommodate fab
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyText: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
    },
    fab: {
        position: "absolute",
        right: theme.spacing.lg,
        bottom: theme.spacing.xl,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});