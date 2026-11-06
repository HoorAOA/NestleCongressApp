import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface AppDividerProps {
  title?: string;
}

const AppDivider = ({ title = 'OR' }: AppDividerProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir(i18n.language) === 'rtl';

  return (
    <View style={[styles.container, { flexDirection: 'row' }]}>
      <View style={styles.line} />
      <Text style={[styles.title, { textAlign: 'start' }]}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default AppDivider;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5EAF1',
  },
  title: {
    fontSize: 11,
    color: '#8A96A8',
    fontWeight: '500',
  },
});