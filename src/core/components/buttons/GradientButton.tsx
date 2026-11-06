import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle, Animated } from 'react-native';
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
    gradientColors?: [string, string];
    disabledGradientColors?: [string, string];
}

const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    startIcon,
    endIcon,
    disabled = false,
    style,
    gradientColors = [Colors.primary, Colors.secondary],
    disabledGradientColors = [Colors.disabled, Colors.disabledDark],
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (disabled) return;

        Animated.spring(scaleAnim, {
            toValue: 0.98,
            friction: 7,
            tension: 180,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        if (disabled) return;

        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 7,
            tension: 180,
            useNativeDriver: true,
        }).start();
    };

    const activeColors = disabled ? disabledGradientColors : gradientColors;

    return (
        <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                onPress={disabled ? undefined : onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                style={[styles.pressable, style]}
            >
                <LinearGradient
                    colors={activeColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.button,
                        { flexDirection: 'row' },
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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 18,
    },
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
});

export default GradientButton;