import React, { useState, ReactNode } from 'react';

import {
    View,
    TextInput,
    Pressable,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    Text,
} from 'react-native';

import { Eye, EyeOff } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

interface AppTextInputProps extends Omit<TextInputProps, 'style'> {
    leftIcon?: ReactNode;
    isPassword?: boolean;
    containerStyle?: ViewStyle;
    isRTL?: boolean;
    helperText?: string;
    validationState?: 'default' | 'error' | 'success';
}

const AppTextInput: React.FC<AppTextInputProps> = ({
    leftIcon,
    isPassword = false,
    containerStyle,
    secureTextEntry,
    isRTL = false,
    helperText,
    validationState = 'default',
    ...textInputProps
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const hideText = isPassword
        ? !passwordVisible
        : secureTextEntry;

    const containerBorderColor =
        validationState === 'error'
            ? Colors.error
            : validationState === 'success'
                ? Colors.success
                : Colors.border;

    const helperColor =
        validationState === 'error'
            ? Colors.error
            : validationState === 'success'
                ? Colors.success
                : Colors.textSecondary;

    return (
        <View style={styles.wrapper}>
            <View
                style={[
                    styles.container,
                    { borderColor: containerBorderColor },
                    containerStyle,
                ]}
            >
                {leftIcon && (
                    <View style={styles.iconContainer}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    {...textInputProps}
                    secureTextEntry={hideText}
                    placeholderTextColor={Colors.placeholder}
                    textAlign={isRTL ? 'right' : 'start'}
                    style={styles.input}
                />

                {isPassword && (
                    <Pressable
                        onPress={() => setPasswordVisible(prev => !prev)}
                        style={styles.eyeButton}
                        accessibilityRole="button"
                        accessibilityLabel={
                            passwordVisible ? 'Hide password' : 'Show password'
                        }
                    >
                        {passwordVisible ? (
                            <Eye size={20} color={Colors.textSecondary} />
                        ) : (
                            <EyeOff size={20} color={Colors.textSecondary} />
                        )}
                    </Pressable>
                )}
            </View>

            {helperText ? (
                <Text style={[styles.helperText, { color: helperColor }]}>
                    {helperText}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },

    container: {
        height: 52,
        borderRadius: 18,
        borderWidth: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 10,
        flexDirection: 'row',
    },

    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        flex: 1,
        height: '100%',
        color: Colors.textPrimary,
        fontFamily: Typography.medium,
        fontSize: 12,
        paddingVertical: 0,
    },

    eyeButton: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    helperText: {
        marginTop: 6,
        fontSize: 11,
        fontFamily: Typography.medium,
        lineHeight: 15,
    },
});

export default AppTextInput;