import EncryptedStorage from 'react-native-encrypted-storage';

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const PASSWORD_HASH_KEY = 'password_hash';

export const SecureStorage = {
    async saveTokens(tokens: AuthTokens): Promise<void> {
        await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    },

    async getAccessToken(): Promise<string | null> {
        return EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
    },

    async getRefreshToken(): Promise<string | null> {
        return EncryptedStorage.getItem(REFRESH_TOKEN_KEY);
    },

    async savePasswordHash(hash: string): Promise<void> {
        await EncryptedStorage.setItem(PASSWORD_HASH_KEY, hash);
    },

    async getPasswordHash(): Promise<string | null> {
        return EncryptedStorage.getItem(PASSWORD_HASH_KEY);
    },

    async clearAuthData(): Promise<void> {
        await EncryptedStorage.removeItem(ACCESS_TOKEN_KEY);
        await EncryptedStorage.removeItem(REFRESH_TOKEN_KEY);
        await EncryptedStorage.removeItem(PASSWORD_HASH_KEY);
    },
};
