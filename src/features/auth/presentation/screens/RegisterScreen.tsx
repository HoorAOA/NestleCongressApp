import React, { useState } from 'react';
import {
    I18nManager,
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Pressable,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
    UserRound,
    Mail,
    Building2,
    LockKeyhole,
    UserPlus,
} from 'lucide-react-native';

import {
    GradientButton,
    WhiteCard,
    AppTitle,
    AppTextInput,
    AppCheckbox,
    MainBackground,
    GoogleIcon,
    AppleIcon,
    SocialButton,
} from '../../../../core/components';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import logger from '../../../../core/utils/logger';

const RegisterScreen = () => {
    const navigation = useNavigation<any>();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleRegister = () => {
        logger.log({ fullName, email, organization, password, agreed });
    };

    const handleSignIn = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Login');
        }
    };

    const handleGoogle = () => logger.log('Google sign up');
    const handleApple = () => logger.log('Apple sign up');
    const dynamicStyles = getStyles(isRTL);

    return (
        <View style={dynamicStyles.container}>
            <MainBackground />

            <KeyboardAvoidingView
                style={dynamicStyles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={dynamicStyles.scroll}
                    contentContainerStyle={dynamicStyles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces
                >
                    {/* Hero */}
                    <View style={dynamicStyles.hero}>
                        <AppTitle
                            title={t('auth.register.heroLine1')}
                            size={30}
                            color={Colors.white}
                            weight="extraBold"
                            align="center"
                            style={{ lineHeight: 36 }}
                        />
                        <AppTitle
                            title={t('auth.register.heroLine2')}
                            size={34}
                            color={Colors.gold}
                            weight="extraBold"
                            align="center"
                            style={{ lineHeight: 40, letterSpacing: 1 }}
                        />
                        <AppTitle
                            title={t('auth.register.heroLine3')}
                            size={34}
                            color={Colors.gold}
                            weight="extraBold"
                            align="center"
                            style={{ lineHeight: 40, letterSpacing: 1 }}
                        />

                        <AppTitle
                            title={t('auth.register.subtitle')}
                            size={12}
                            color={Colors.whiteSoftAlt5}
                            weight="medium"
                            align="center"
                            style={{ lineHeight: 18, marginTop: 14 }}
                        />
                    </View>

                    <WhiteCard>
                        <View style={dynamicStyles.form}>
                            <AppTextInput
                                placeholder={t('auth.register.fullName')}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                leftIcon={
                                    <UserRound size={18} color={Colors.blue} />
                                }
                            />

                            <AppTextInput
                                placeholder={t('auth.register.email')}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                leftIcon={
                                    <Mail size={18} color={Colors.blue} />
                                }
                            />

                            <AppTextInput
                                placeholder={t('auth.register.organization')}
                                value={organization}
                                onChangeText={setOrganization}
                                autoCapitalize="words"
                                leftIcon={
                                    <Building2 size={18} color={Colors.blue} />
                                }
                            />

                            <AppTextInput
                                placeholder={t('auth.register.password')}
                                value={password}
                                onChangeText={setPassword}
                                isRTL={isRTL}
                                isPassword
                                leftIcon={
                                    <LockKeyhole size={18} color={Colors.blue} />
                                }
                            />

                            <AppCheckbox
                                label={t('auth.register.consent')}
                                checked={agreed}
                                onChange={setAgreed}
                                isRTL={isRTL}
                            />

                            <GradientButton
                                title={t('auth.register.button')}
                                onPress={handleRegister}
                                startIcon={
                                    <UserPlus size={20} color={Colors.white} />
                                }
                            />
                        </View>

                        {/* Social sign up */}
                        <View style={[dynamicStyles.dividerRow, { flexDirection: 'row' }]}>
                            <View style={dynamicStyles.dividerLine} />
                            <Text style={dynamicStyles.dividerText}>
                                {t('auth.register.socialDivider')}
                            </Text>
                            <View style={dynamicStyles.dividerLine} />
                        </View>

                        <View style={[dynamicStyles.socialRow, { flexDirection: 'row' }]}>
                            <SocialButton onPress={handleGoogle}>
                                <GoogleIcon />
                            </SocialButton>
                            <SocialButton onPress={handleApple}>
                                <AppleIcon />
                            </SocialButton>
                        </View>
                    </WhiteCard>

                    {/* Sign in */}
                    <View style={[dynamicStyles.signInContainer, { flexDirection: 'row' }]}>
                        <Text style={dynamicStyles.signInText}>
                            {t('auth.register.alreadyHaveAccount')}
                        </Text>
                        <Pressable onPress={handleSignIn} hitSlop={8}>
                            <Text style={dynamicStyles.signInLink}>{t('auth.register.signIn')}</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default RegisterScreen;

const getStyles = (isRTL: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    keyboardContainer: {
        flex: 1,
    },

    scroll: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop:
            Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 20 : 60,
        paddingBottom: 30,
    },

    /* Hero */
    hero: {
        alignItems: 'center',
        marginBottom: 24,
    },

    /* Card */
    form: {
        gap: 12,
    },

    dividerRow: {
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.borderMuted,
    },

    dividerText: {
        fontSize: 9,
        fontFamily: Typography.semiBold,
        letterSpacing: 0.8,
        color: Colors.textSecondary,
    },

    socialRow: {
        gap: 12,
        marginTop: 16,
    },

    /* Footer */
    signInContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 20,
    },

    signInText: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.whiteSoftAlt4,
    },

    signInLink: {
        fontSize: 12,
        fontFamily: Typography.bold,
        color: Colors.gold,
    },
});
