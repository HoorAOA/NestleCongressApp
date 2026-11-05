import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'isLoggedIn';

export const AuthStorage = {
  async isLoggedIn(): Promise<boolean> {
    const value = await AsyncStorage.getItem(AUTH_KEY);
    return value === 'true';
  },

  async setLoggedIn(value: boolean): Promise<void> {
    await AsyncStorage.setItem(AUTH_KEY, String(value));
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_KEY);
  },
};