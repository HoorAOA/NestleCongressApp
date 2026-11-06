import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/features/auth/presentation/screens/SplashScreen';
import LoginScreen from './src/features/auth/presentation/screens/LoginScreen';
import RegisterScreen from './src/features/auth/presentation/screens/RegisterScreen';
import MainTabs from './src/features/home/presentation/screens/MainTabs';

import { AuthStorage } from './src/core/storage/authStorage';
import { AuthContext } from './src/core/auth/AuthContext';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const [loggedIn] = await Promise.all([
                    AuthStorage.isLoggedIn(),
                    new Promise<void>(resolve => setTimeout(resolve, 2000)),
                ]);

                setAuthStatus(loggedIn ? 'authenticated' : 'unauthenticated');
            } catch (error) {
                console.error('Authentication check failed:', error);
                setAuthStatus('unauthenticated');
            }
        };

        initializeApp();
    }, []);

    const auth = useMemo(
    () => ({
        signIn: async () => {
            try {
                await AuthStorage.setLoggedIn(true);
            } catch (error) {
                console.error('Failed to save login state:', error);
            }
            setAuthStatus('authenticated');
        },
        signOut: async () => {
            try {
                await AuthStorage.setLoggedIn(false);
            } catch (error) {
                console.error('Failed to clear login state:', error);
            }
            setAuthStatus('unauthenticated');
        },
    }),
    [],
);

    if (authStatus === 'loading') {
        return <SplashScreen />;
    }

    return (
        <AuthContext.Provider value={auth}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                >
                    {authStatus === 'authenticated' ? (
                        <Stack.Screen name="Main" component={MainTabs} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <AppContent />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
