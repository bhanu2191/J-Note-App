import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token");
            router.replace(token ? "/notes" : "/login");
        })();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
        </View>
    );
}