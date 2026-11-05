import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AppDividerProps {
  title?: string;
}

const AppDivider = ({ title = 'OR' }: AppDividerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default AppDivider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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