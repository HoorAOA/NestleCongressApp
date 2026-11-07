import React, { useEffect, useMemo, useState } from 'react';
import { I18nManager, StatusBar, StyleSheet, View } from 'react-native';

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
import { LanguageContext } from './src/core/localization/LanguageContext';
import { initializeLanguage } from './src/core/localization/i18n';
import logger from './src/core/utils/logger';

import type { RootStackParamList } from './src/core/navigation/types';
import LiveVotingScreen from './src/features/quickAccess/presentation/screens/LiveVotingScreen';
import AskQAScreen from './src/features/quickAccess/presentation/screens/AskQAScreen';
import ResourcesScreen from './src/features/quickAccess/presentation/screens/ResourcesScreen';


type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [languageReady, setLanguageReady] = useState(false);
  const [directionVersion, setDirectionVersion] = useState(0);
  const directionKey = `${authStatus}-${directionVersion}`;
  const isRTL = I18nManager.isRTL;

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeLanguage();
        setLanguageReady(true);

        const loggedIn = await AuthStorage.isLoggedIn();
        await new Promise<void>(resolve => setTimeout(resolve, 2000));

        setAuthStatus(loggedIn ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        logger.error('Authentication check failed:', error);
        setLanguageReady(true);
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
          logger.error('Failed to save login state:', error);
        }
        setAuthStatus('authenticated');
      },
      signOut: async () => {
        try {
          await AuthStorage.setLoggedIn(false);
        } catch (error) {
          logger.error('Failed to clear login state:', error);
        }
        setAuthStatus('unauthenticated');
      },
    }),
    [],
  );

  const languageContextValue = useMemo(
    () => ({
      isRTL,
      refreshDirection: () => setDirectionVersion(prev => prev + 1),
    }),
    [isRTL],
  );

  if (authStatus === 'loading' || !languageReady) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={auth}>
      <LanguageContext.Provider value={languageContextValue}>
        <NavigationContainer key={directionKey}>
          <Stack.Navigator
            key={directionKey}
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            {authStatus === 'authenticated' ? (<>
              <Stack.Screen key={`main-${directionKey}`} name="Main" component={MainTabs} />
              <Stack.Screen key={`quick-access-${directionKey}`} name="QuickAccess" component={QuickAccessScreen} />
              <Stack.Screen key={`agenda-${directionKey}`} name="Agenda" component={AgendaScreen} />
              <Stack.Screen key={`speakers-${directionKey}`} name="Speakers" component={SpeakersScreen} />
              <Stack.Screen key={`name-tag-${directionKey}`} name="NameTag" component={NameTagScreen} />
              <Stack.Screen key={`venue-${directionKey}`} name="Venue" component={VenueScreen} />
              <Stack.Screen key={`voting-${directionKey}`} name="Voting" component={LiveVotingScreen} />
              <Stack.Screen key={`ask-qa-${directionKey}`} name="AskQA" component={AskQAScreen} />
              <Stack.Screen key={`resources-${directionKey}`} name="Resources" component={ResourcesScreen} />
            </>

            ) : (
              <>
                <Stack.Screen key={`login-${directionKey}`} name="Login" component={LoginScreen} />
                <Stack.Screen
                  key={`register-${directionKey}`}
                  name="Register"
                  component={RegisterScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View
        style={[
          styles.container,
          { direction: I18nManager.isRTL ? 'rtl' : 'ltr' },
        ]}
      >
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
