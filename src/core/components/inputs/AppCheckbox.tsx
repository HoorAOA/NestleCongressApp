import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

interface AppCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const AppCheckbox = ({
  label,
  checked,
  onChange,
}: AppCheckboxProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
      </View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default AppCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    minHeight: 44,
  },
  box: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#B8C5D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});