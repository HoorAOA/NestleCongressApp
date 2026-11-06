import axios, { AxiosError, AxiosResponse } from 'axios';

import logger from '../utils/logger';
import { environment } from '../config/environment';

const apiClient = axios.create({
    baseURL: environment.apiBaseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: status => status >= 200 && status < 500,
});

apiClient.interceptors.request.use(
    config => {
        logger.log('[API Request]', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            params: config.params,
            data: config.data,
        });

        return config;
    },
    error => {
        logger.error('[API Request Error]', error);
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        logger.log('[API Response]', {
            status: response.status,
            url: response.config?.url,
            data: response.data,
        });

        return response;
    },
    (error: AxiosError) => {
        logger.error('[API Response Error]', {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
            message: error.message,
        });

        return Promise.reject(error);
    },
);

export const getApiErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 400) {
            return 'Invalid username or password.';
        }

        if (status === 401) {
            return 'Your session has expired. Please sign in again.';
        }

        if (status === 403) {
            return 'Access denied.';
        }

        if (status === 404) {
            return 'The requested resource was not found.';
        }

        if (status === 429) {
            return 'Too many attempts. Please try again later.';
        }

        if (typeof serverMessage === 'string' && serverMessage.trim()) {
            return serverMessage;
        }

        if (!error.response) {
            return 'No internet connection. Please check your network and try again.';
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return 'Something went wrong. Please try again.';
};

export default apiClient;
