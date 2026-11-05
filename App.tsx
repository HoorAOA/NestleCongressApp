import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/features/auth/presentation/SplashScreen';
import LoginScreen from './src/features/auth/presentation/LoginScreen';
import RegisterScreen from './src/features/auth/presentation/RegisterScreen';
import HomeScreen from './src/features/home/presentation/HomeScreen';

import { AuthStorage } from './src/core/storage/authStorage';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

    useEffect(() => {
        const initializeApp = async () => {
            const startTime = Date.now();

            try {
                const loggedIn = await AuthStorage.isLoggedIn();

                await new Promise<void>(resolve => setTimeout(resolve, 2000));

                setAuthStatus(loggedIn ? 'authenticated' : 'unauthenticated');
            } catch (error) {
                console.error('Authentication check failed:', error);
                setAuthStatus('unauthenticated');
            }
        };

        initializeApp();
    }, []);

    if (authStatus === 'loading') {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                {authStatus === 'authenticated' ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
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