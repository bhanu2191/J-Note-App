import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../utils/theme";

interface ChipRowProps {
    categories: readonly string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function ChipRow({ categories, selectedCategory, onSelectCategory }: ChipRowProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.chip, isActive && styles.chipActive]}
                        onPress={() => onSelectCategory(cat)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    chip: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chipActive: {
        backgroundColor: theme.colors.text,
        borderColor: theme.colors.text,
    },
    chipText: {
        ...theme.typography.captionMedium,
        color: theme.colors.textSecondary,
    },
    chipTextActive: {
        color: theme.colors.card,
    },
});
