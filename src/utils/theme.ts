export const theme = {
    colors: {
        primary: "#4F46E5", // Indigo
        background: "#F9FAFB", // Light Neutral
        card: "#FFFFFF",
        text: "#111827", // Dark
        textSecondary: "#6B7280",
        border: "#E5E7EB",
        error: "#EF4444",
        success: "#10B981",
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    radii: {
        sm: 8,
        md: 12,
        lg: 16,
        full: 9999,
    },
    typography: {
        h1: { fontSize: 32, fontWeight: "800" as const },
        h2: { fontSize: 24, fontWeight: "800" as const },
        h3: { fontSize: 20, fontWeight: "700" as const },
        body: { fontSize: 16, fontWeight: "400" as const },
        bodyMedium: { fontSize: 16, fontWeight: "500" as const },
        caption: { fontSize: 14, fontWeight: "400" as const },
        captionMedium: { fontSize: 14, fontWeight: "500" as const },
        small: { fontSize: 12, fontWeight: "500" as const },
    },
    shadows: {
        subtle: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 4,
        },
    },
};
