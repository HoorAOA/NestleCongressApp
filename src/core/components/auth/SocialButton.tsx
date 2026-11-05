import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Colors } from '../../theme/colors';

const SocialButton = ({
    children,
    onPress,
}: {
    children: React.ReactNode;
    onPress: () => void;
}) => (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.7 },
        ]}
    >
        {children}
    </Pressable>
);

const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.borderSoft,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SocialButton;
