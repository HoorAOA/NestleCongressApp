import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppLanguage = 'en' | 'ar';

const LANGUAGE_KEY = 'selectedLanguage';

export const LanguageStorage = {
    async getLanguage(): Promise<AppLanguage> {
        const value = await AsyncStorage.getItem(LANGUAGE_KEY);

        if (value === 'ar' || value === 'en') {
            return value;
        }

        return 'en';
    },

    async setLanguage(value: AppLanguage): Promise<void> {
        await AsyncStorage.setItem(LANGUAGE_KEY, value);
    },

    async removeLanguage(): Promise<void> {
        await AsyncStorage.removeItem(LANGUAGE_KEY);
    },
};
