import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/features/auth/presentation/screens/SplashScreen';
import LoginScreen from './src/features/auth/presentation/screens/LoginScreen';
import RegisterScreen from './src/features/auth/presentation/screens/RegisterScreen';
import MainTabs from './src/features/home/presentation/screens/MainTabs';
import QuickAccessScreen from './src/features/quickAccess/presentation/screens/QuickAccessScreen';
import NameTagScreen from './src/features/quickAccess/presentation/screens/NameTagScreen';
import AgendaScreen from './src/features/quickAccess/presentation/screens/AgendaScreen';
import SpeakersScreen from './src/features/quickAccess/presentation/screens/SpeakersScreen';
import VenueScreen from './src/features/quickAccess/presentation/screens/VenueScreen';

import { AuthStorage } from './src/core/storage/authStorage';
import { AuthContext } from './src/core/auth/AuthContext';

import type { RootStackParamList } from './src/core/navigation/types';


type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

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
          {authStatus === 'authenticated' ? (<>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="QuickAccess" component={QuickAccessScreen} />
            <Stack.Screen name="Agenda" component={AgendaScreen} />
            <Stack.Screen name="Speakers" component={SpeakersScreen} />
            <Stack.Screen name="NameTag" component={NameTagScreen} />
            <Stack.Screen name="Venue" component={VenueScreen} />
          </>

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
