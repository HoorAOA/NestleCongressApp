import React from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    style?: ViewStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    startIcon,
    endIcon,
    disabled = false,
    style,
}) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[styles.pressable, style]}
        >
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.button,
                    { flexDirection: 'row' },
                    disabled && styles.disabled,
                ]}
            >
                {startIcon && (
                    <View style={styles.icon}>
                        {startIcon}
                    </View>
                )}

                <Text style={styles.title}>{title}</Text>

                {endIcon && (
                    <View style={styles.icon}>
                        {endIcon}
                    </View>
                )}
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        borderRadius: 18,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        height: 48,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
        gap: 10,
    },
    title: {
        color: Colors.white,
        fontFamily: Typography.bold,
        fontWeight: 'bold',
        fontSize: 15,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});

export default GradientButton;