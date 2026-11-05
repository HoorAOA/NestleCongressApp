import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/features/auth/presentation/SplashScreen';
import LoginScreen from './src/features/auth/presentation/LoginScreen';
import HomeScreen from './src/features/home/presentation/HomeScreen';

import { AuthStorage } from './src/core/storage/authStorage';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

function AppContent() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const initializeApp = async () => {
      const startTime = Date.now();

      try {
        const loggedIn = await AuthStorage.isLoggedIn();

        // Keep splash screen visible for at least 2 seconds.
        const remainingTime = Math.max(
          0,
          2000 - (Date.now() - startTime),
        );

        await new Promise<void>(resolve => setTimeout(() => resolve(), remainingTime));

        setAuthStatus(
          loggedIn ? 'authenticated' : 'unauthenticated',
        );
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthStatus('unauthenticated');
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {authStatus === 'loading' && <SplashScreen />}

      {authStatus === 'unauthenticated' && <LoginScreen />}

      {authStatus === 'authenticated' && <HomeScreen />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});