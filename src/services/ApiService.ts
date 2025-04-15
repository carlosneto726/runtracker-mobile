import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '../../app.json';
import { Alert } from 'react-native';

const api = axios.create({
    baseURL: app.apiUrl,
});

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        console.log(response);
        const token = response.data.access_token;
        await AsyncStorage.setItem('jwt_token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return response;
    } catch (error) {
        console.log(error);
        Alert.alert('CARALHO DEU MUITO RUIM', JSON.stringify(error));
    }
};

export async function getUser () {
    try {
        const token = await AsyncStorage.getItem('jwt_token');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/me');
        return response.data;
    } catch (error: any) {
        console.log(error);
        Alert.alert('error', JSON.stringify(error));
    }
};

export const logout = async () => {
    await api.post('/logout');
    await AsyncStorage.removeItem('jwt_token');
    delete api.defaults.headers.common['Authorization'];
};

export const getCircuit = async (id: number) => {
    const response = await api.get(`/circuit/${id}`);
    return response;
}

export const sendLap = async (data: any) => {
    try {
        const response = await api.post(`/lap`, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUserLaps = async () => {
    const response = await api.get('/profile/laps');
    return response.data;
}

export async function refresh () {
    const response = await api.post('/refresh');
    const token = response.data.access_token;
    await AsyncStorage.setItem('jwt_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
}


