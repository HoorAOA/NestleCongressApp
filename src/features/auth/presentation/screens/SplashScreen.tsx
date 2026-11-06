import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../../core/theme/colors';
import MainBackground from '../../../../core/components/background/MainBackground';

const SplashScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <MainBackground />

      {/* Center branding */}
      <View style={styles.brandContainer}>
        <Text style={styles.nestleText}>{t('app.splashNestle', 'NESTLÉ')}</Text>

        <Text style={styles.congressText}>
          {t('app.splashCongress', 'CONGRESS')}
        </Text>

        <View style={styles.bottomLine} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  nestleText: {
    color: Colors.white,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: -10,
  },

  congressText: {
    color: Colors.goldLight,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: -2,
  },

  bottomLine: {
    width: 48,
    height: 2,
    borderRadius: 3,
    backgroundColor: Colors.goldLight,
    marginTop: 22,
  },
});