import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

const USER_PROFILE_KEY = 'user_profile';

export const UserStorage = {
    async saveUserProfile(profile: UserProfile): Promise<void> {
        await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    },

    async getUserProfile(): Promise<UserProfile | null> {
        const value = await AsyncStorage.getItem(USER_PROFILE_KEY);

        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value) as UserProfile;
        } catch {
            return null;
        }
    },

    async clearUserProfile(): Promise<void> {
        await AsyncStorage.removeItem(USER_PROFILE_KEY);
    },
};
