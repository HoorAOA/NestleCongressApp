import React, { useState, ReactNode } from 'react';

import { I18nManager, View, TextInput, Pressable, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import { Eye, EyeOff } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

interface AppTextInputProps extends Omit<TextInputProps, 'style'> {
    leftIcon?: ReactNode;
    isPassword?: boolean;
    containerStyle?: ViewStyle;
    isRTL?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
    leftIcon,
    isPassword = false,
    containerStyle,
    secureTextEntry,
    isRTL = false,
    ...textInputProps
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const hideText = isPassword
        ? !passwordVisible
        : secureTextEntry;

    return (
        <View
            style={[
                styles.container,
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
                style={[
                    styles.input,
                    {
                        textAlign: isRTL ? 'right' : 'left',
                        writingDirection: isRTL ? 'rtl' : 'ltr',
                    },
                ]}
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
    );
};

const styles = StyleSheet.create({
    container: {
        height: 52,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.border,
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
});

export default AppTextInput;