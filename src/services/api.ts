import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./env";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");

    // Make sure headers object exists
    config.headers = config.headers ?? {};

    if (token) {
        // Force set Authorization header
        (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
});