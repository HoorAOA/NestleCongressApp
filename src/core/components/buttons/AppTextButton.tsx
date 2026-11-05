import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

import { Colors } from '../../theme/colors';

interface AppTextButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
}

const AppTextButton = ({
  title,
  onPress,
  color = Colors.primary,
  fontSize = 12,
  style,
}: AppTextButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
    >
      <Text style={[styles.text, { color, fontSize }, style]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default AppTextButton;

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
  },
});