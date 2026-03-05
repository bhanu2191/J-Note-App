import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

interface NoteCardProps {
    title: string;
    content: string;
    category: string;
    createdAt: string;
    onPress: () => void;
}

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Work": return "briefcase-outline";
        case "Study": return "book-outline";
        case "Personal": return "person-outline";
        case "Ideas": return "bulb-outline";
        default: return "document-text-outline";
    }
};

export function NoteCard({ title, content, category, createdAt, onPress }: NoteCardProps) {
    return (
        <TouchableOpacity
            style={[styles.card, theme.shadows.subtle]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={getCategoryIcon(category) as any} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.content} numberOfLines={2}>{content}</Text>

                <View style={styles.footer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{category}</Text>
                    </View>
                    <Text style={styles.date}>{createdAt.split("T")[0]}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: theme.colors.card,
        borderRadius: theme.radii.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.md,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: 4,
    },
    content: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    badge: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: theme.radii.sm,
    },
    badgeText: {
        ...theme.typography.small,
        color: theme.colors.primary,
    },
    date: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
});
