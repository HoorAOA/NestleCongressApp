import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Pressable,
    StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import {
    UserRound,
    LockKeyhole,
    ArrowRight,
    ArrowLeft,
    Users,
    CalendarCheck,
    Star,
    ShieldCheck,
} from 'lucide-react-native';

import {
    GradientButton,
    WhiteCard,
    AppTitle,
    AppTextInput,
    AppTextButton,
    MainBackground,
    GoogleIcon,
    AppleIcon,
    SocialButton,
    FeatureItem,
    FeatureDivider,
    GradientBadge,
} from '../../../../core/components';

import { Colors } from '../../../../core/theme/colors';

import { useNavigation } from '@react-navigation/native';

import { validateLogin, LoginErrors } from '../../../../core/utils/validators';
import { useAuth } from '../../../../core/auth/AuthContext';
import logger from '../../../../core/utils/logger';
/* ---------- Screen ---------- */

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    const { signIn } = useAuth();
    const [errors, setErrors] = useState<LoginErrors>({});

    const handleLogin = () => {
        const result = validateLogin(email, password);
        setErrors(result.errors);

        if (!result.isValid) return;

        signIn();
    };

    const handleForgotPassword = () => {
        logger.log('Forgot password pressed');
    };

    const navigation = useNavigation<any>();

    const handleRegister = () => {
        navigation.navigate('Register');
    };


    const handleGoogle = () => logger.log('Google sign in');
    const handleApple = () => logger.log('Apple sign in');
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
                        <View style={dynamicStyles.badge}>
                            <Text style={dynamicStyles.badgeText}>
                                {t('auth.login.badge')}
                            </Text>
                        </View>

                        <View style={dynamicStyles.titleWrap}>
                            <Text style={dynamicStyles.titleWhite}>{t('app.splashNestle')}</Text>
                            <Text style={dynamicStyles.titleGold}>{t('app.splashCongress')}</Text>
                        </View>

                        <View style={dynamicStyles.bottomLine} />

                        <Text style={dynamicStyles.tagline}>
                            {t('auth.login.tagline')}
                        </Text>
                    </View>

                    <WhiteCard>
                        {/* Header */}
                        <View
                            style={[
                                dynamicStyles.cardHeader
                            ]}
                        >
                            <View
                                style={[
                                    dynamicStyles.header,
                                    { alignItems: isRTL ? 'flex-end' : 'flex-start' },
                                ]}
                            >
                                <AppTitle
                                    title={t('auth.login.title')}
                                    size={24}
                                    color={Colors.textPrimary}
                                    weight="extraBold"
                                    align={isRTL ? 'right' : 'left'}
                                    style={{ lineHeight: 28, width: '100%' }}
                                />

                                <AppTitle
                                    title={t('auth.login.subtitle')}
                                    size={12}
                                    color={Colors.textSecondary}
                                    weight="medium"
                                    align={isRTL ? 'right' : 'left'}
                                    style={{ lineHeight: 18, width: '100%' }}
                                />
                            </View>

                            <GradientBadge
                                size={52}
                                radius={20}
                                icon={ShieldCheck}
                                iconSize={22}
                            />
                        </View>

                        {/* Login form */}
                        <View style={dynamicStyles.form}>
                            <AppTextInput
                                isRTL={isRTL}
                                placeholder={t('auth.login.emailPlaceholder')}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                leftIcon={<UserRound size={18} color={Colors.blue} />}
                            />

                            <AppTextInput
                                isRTL={isRTL}
                                placeholder={t('auth.login.passwordPlaceholder')}
                                value={password}
                                onChangeText={setPassword}
                                isPassword
                                leftIcon={<LockKeyhole size={18} color={Colors.blue} />}
                            />

                            <GradientButton
                                title={t('auth.login.button')}
                                onPress={handleLogin}
                                endIcon={
                                    isRTL ? (
                                        <ArrowLeft size={20} color={Colors.white} />
                                    ) : (
                                        <ArrowRight size={20} color={Colors.white} />
                                    )
                                }
                            />
                        </View>

                        {/* Social login */}
                        <View style={[dynamicStyles.dividerRow, { flexDirection: 'row' }]}>
                            <View style={dynamicStyles.dividerLine} />
                            <Text style={dynamicStyles.dividerText}>
                                {t('auth.login.socialDivider')}
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

                        {/* Forgot password */}
                        <View style={[dynamicStyles.forgotRow, { flexDirection: 'row' }]}>
                            <LockKeyhole size={14} color={Colors.blue} />
                            <AppTextButton
                                title={t('auth.login.forgotPassword')}
                                color={Colors.blue}
                                onPress={handleForgotPassword}
                            />
                        </View>
                    </WhiteCard>

                    {/* Register */}
                    <View style={[dynamicStyles.registerContainer, { flexDirection: 'row' }]}>
                        <Text style={dynamicStyles.registerText}>
                            {t('auth.login.noAccount')}
                        </Text>
                        <Pressable
                            onPress={handleRegister}
                            style={[dynamicStyles.registerLink, { flexDirection: 'row' }]}
                            hitSlop={8}
                        >
                            <Text style={dynamicStyles.registerLinkText}>
                                {t('auth.login.createAccount')}
                            </Text>
                            {isRTL ? (
                                <ArrowLeft size={14} color={Colors.gold} />
                            ) : (
                                <ArrowRight size={14} color={Colors.gold} />
                            )}
                        </Pressable>
                    </View>

                    {/* Feature chips */}
                    <View style={[dynamicStyles.featuresContainer, { flexDirection: 'row' }]}>
                        <FeatureItem
                            icon={<Users size={16} color={Colors.blueBright} />}
                            label={t('auth.login.globalExperts')}
                        />
                        <FeatureDivider />
                        <FeatureItem
                            icon={<CalendarCheck size={16} color={Colors.blueBright} />}
                            label={t('auth.login.knowledgeSessions')}
                        />
                        <FeatureDivider />
                        <FeatureItem
                            icon={<Star size={16} color={Colors.gold} />}
                            label={t('auth.login.networking')}
                            tone="gold"
                        />
                    </View> 
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;

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

    badge: {
        borderWidth: 1,
        borderColor: Colors.gold,
        backgroundColor: Colors.glassFill,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },

    badgeText: {
        color: Colors.white,
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1.2,
    },

    titleWrap: {
        alignItems: 'center',
        marginTop: 18,
    },

    titleWhite: {
        color: Colors.white,
        fontSize: 34,
        fontWeight: '900',
        letterSpacing: 1,
        lineHeight: 38,
    },

    titleGold: {
        color: Colors.gold,
        fontSize: 34,
        fontWeight: '900',
        letterSpacing: 1,
        lineHeight: 38,
    },

    tagline: {
        color: Colors.whiteSoftAlt4,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 17,
    },

    /* Card */
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    header: {
        flex: 1,
        gap: 7
    },

    form: {
        marginTop: 12,
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
        opacity: 1,
    },

    dividerText: {
        fontSize: 9,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: Colors.textSecondary,
    },

    socialRow: {
        gap: 12,
        marginTop: 16,
    },

    forgotRow: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 18,
    },

    /* Register */
    registerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 20,
    },

    registerText: {
        fontSize: 12,
        color: Colors.whiteSoftAlt4,
    },

    registerLink: {
        alignItems: 'center',
        gap: 3,
    },

    registerLinkText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.gold,
    },

    /* Feature chips */
    featuresContainer: {
        alignItems: 'center',
        marginTop: 22,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 16,
        backgroundColor: Colors.whiteSoftAlt6,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },

    bottomLine: {
        width: 48,
        height: 2,
        borderRadius: 3,
        backgroundColor: Colors.gold,
        marginTop: 10,
    },
});
