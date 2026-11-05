import React, { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface AppIconButtonProps {
  icon: ReactNode;
  onPress: () => void;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
}

const AppIconButton = ({
  icon,
  onPress,
  backgroundColor = '#EAF3FF',
  size = 44,
  style,
}: AppIconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
      accessibilityRole="button"
    >
      {icon}
    </Pressable>
  );
};

export default AppIconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});