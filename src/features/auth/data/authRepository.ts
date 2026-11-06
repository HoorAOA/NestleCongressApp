import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

import apiClient, { getApiErrorMessage } from '../../../core/network/apiClient';
import { SecureStorage } from '../../../core/storage/secureStorage';
import { hashPassword } from '../../../core/utils/passwordHash';
import { LoginApiResponse, LoginCredentials } from '../domain/types';

export const checkNetworkConnection = async (): Promise<boolean> => {
    try {
        const state = await NetInfo.fetch();
        return Boolean(state.isConnected && (state.isInternetReachable ?? true));
    } catch {
        return false;
    }
};

export const loginUser = async ({ username, password }: LoginCredentials): Promise<LoginApiResponse> => {
    const passwordHash = await hashPassword(password);
    await SecureStorage.savePasswordHash(passwordHash);

    try {
        const response = await apiClient.post('/auth/login', {
            username,
            password,
            expiresInMins: 30,
        }, {
            withCredentials: true,
        });

        if (response.status >= 200 && response.status < 300) {
            const data = response.data as LoginApiResponse;

            await SecureStorage.saveTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            return data;
        }

        const serverMessage = response?.data?.message;
        if (typeof serverMessage === 'string' && serverMessage.trim()) {
            throw new Error(serverMessage);
        }

        throw new Error(`Login failed with status ${response.status}`);
    } catch (error) {
        if (axios.isAxiosError(error) && !error.response) {
            throw new Error('No internet connection. Please check your network and try again.');
        }

        throw new Error(getApiErrorMessage(error));
    }
};
