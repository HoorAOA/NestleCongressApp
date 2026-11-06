import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MainBackground from '../../../../core/components/background/MainBackground';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <MainBackground/>

      {/* Center branding */}
      <View style={styles.brandContainer}>
        <Text style={styles.nestleText}>NESTLÉ</Text>

        <Text style={styles.congressText}>
          CONGRESS
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
    backgroundColor: '#061D50',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  nestleText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: -10,
  },

  congressText: {
    color: '#FFD34E',
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
    backgroundColor: '#FFD34E',
    marginTop: 22,
  },
});