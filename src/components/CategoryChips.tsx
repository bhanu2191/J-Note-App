import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { CATEGORIES } from "../utils/categories";
import { theme } from "../utils/theme";

interface CategoryChipsProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export function CategoryChips({ selectedCategory, onSelectCategory }: CategoryChipsProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <TouchableOpacity
                    style={[
                        styles.chip,
                        selectedCategory === null && styles.chipActive
                    ]}
                    onPress={() => onSelectCategory(null)}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.chipText,
                        selectedCategory === null && styles.chipTextActive
                    ]}>
                        All
                    </Text>
                </TouchableOpacity>

                {CATEGORIES.map((cat: any) => {
                    const isActive = selectedCategory === cat.key;
                    return (
                        <TouchableOpacity
                            key={cat.key}
                            style={[
                                styles.chip,
                                isActive && styles.chipActive
                            ]}
                            onPress={() => onSelectCategory(cat.key)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.chipText,
                                isActive && styles.chipTextActive
                            ]}>
                                {cat.key}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.md,
        paddingBottom: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    chip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.subtle,
    },
    chipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    chipText: {
        ...theme.typography.bodyMedium,
        color: theme.colors.textSecondary,
    },
    chipTextActive: {
        color: "#FFF",
        fontWeight: "600",
    }
});
