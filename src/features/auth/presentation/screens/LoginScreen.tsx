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
    Modal,
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
import { checkConnectionUseCase, loginUserUseCase } from '../../../../features/auth/domain/useCases/login';
import { UserStorage } from '../../../../core/storage/userStorage';
import { SecureStorage } from '../../../../core/storage/secureStorage';

/* ---------- Screen ---------- */

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showRetryButton, setShowRetryButton] = useState(false);

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    const { signIn } = useAuth();
    const [errors, setErrors] = useState<LoginErrors>({});

    const usernameValid = username.trim().length >= 3;
    const passwordValid = password.length >= 6;
    const isFormValid = usernameValid && passwordValid;

    const openInfoModal = (title: string, message: string, retry = false) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowRetryButton(retry);
        setModalVisible(true);
    };

    const handleLogin = async () => {
        const result = validateLogin(username, password);
        setErrors(result.errors);

        if (!result.isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const hasConnection = await checkConnectionUseCase();

            if (!hasConnection) {
                openInfoModal(t('auth.login.noInternetTitle'), t('auth.login.noInternetMessage'), true);
                return;
            }

            const response = await loginUserUseCase({
                username: username.trim(),
                password,
            });

            logger.log('Login:', response);
            await UserStorage.saveUserProfile({
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
            });

            await SecureStorage.saveTokens({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
            });

            await signIn();
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : t('auth.login.loginErrorTitle');

            openInfoModal(t('auth.login.loginErrorTitle'), message, false);
            logger.error('Login failed:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                        <View style={[dynamicStyles.cardHeader]}>
                            <View style={[dynamicStyles.header, { alignItems: 'flex-start' }]}>
                                <AppTitle
                                    title={t('auth.login.title')}
                                    size={24}
                                    color={Colors.textPrimary}
                                    weight="extraBold"
                                    style={{ lineHeight: 28, width: '100%' }}
                                />

                                <AppTitle
                                    title={t('auth.login.subtitle')}
                                    size={12}
                                    color={Colors.textSecondary}
                                    weight="medium"
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

                        <View style={dynamicStyles.form}>
                            <AppTextInput
                                placeholder={t('auth.login.usernamePlaceholder')}
                                value={username}
                                onChangeText={text => {
                                    setUsername(text);
                                    setErrors(prev => ({
                                        ...prev,
                                        username: text.trim().length >= 3 ? undefined : prev.username,
                                    }));
                                }}
                                autoCapitalize="none"
                                leftIcon={<UserRound size={18} color={Colors.blue} />}
                                helperText={
                                    username.length > 0
                                        ? usernameValid
                                            ? t('auth.login.usernameValid')
                                            : t('auth.login.usernameInvalid')
                                        : undefined
                                }
                                validationState={
                                    username.length === 0
                                        ? 'default'
                                        : usernameValid
                                            ? 'success'
                                            : 'error'
                                }
                            />

                            <AppTextInput
                                placeholder={t('auth.login.passwordPlaceholder')}
                                value={password}
                                onChangeText={text => {
                                    setPassword(text);
                                    setErrors(prev => ({
                                        ...prev,
                                        password: text.length >= 6 ? undefined : prev.password,
                                    }));
                                }}
                                isRTL={isRTL}
                                isPassword
                                leftIcon={<LockKeyhole size={18} color={Colors.blue} />}
                                helperText={
                                    password.length > 0
                                        ? passwordValid
                                            ? t('auth.login.passwordValid')
                                            : t('auth.login.passwordInvalid')
                                        : undefined
                                }
                                validationState={
                                    password.length === 0
                                        ? 'default'
                                        : passwordValid
                                            ? 'success'
                                            : 'error'
                                }
                            />

                            <GradientButton
                                title={isSubmitting ? t('auth.login.button') : t('auth.login.button')}
                                onPress={() => {
                                    void handleLogin();
                                }}
                                disabled={!isFormValid || isSubmitting}
                                gradientColors={[Colors.primary, Colors.secondary]}
                                disabledGradientColors={[Colors.disabled, Colors.disabledDark]}
                                endIcon={
                                    isRTL ? (
                                        <ArrowLeft size={20} color={Colors.white} />
                                    ) : (
                                        <ArrowRight size={20} color={Colors.white} />
                                    )
                                }
                            />
                        </View>

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

                        <View style={[dynamicStyles.forgotRow, { flexDirection: 'row' }]}>
                            <LockKeyhole size={14} color={Colors.blue} />
                            <AppTextButton
                                title={t('auth.login.forgotPassword')}
                                color={Colors.blue}
                                onPress={handleForgotPassword}
                            />
                        </View>
                    </WhiteCard>

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

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={dynamicStyles.modalBackdrop}
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable
                        style={dynamicStyles.modalCard}
                        onPress={event => event.stopPropagation()}
                    >
                        <Text style={dynamicStyles.modalTitle}>{modalTitle}</Text>
                        <Text style={dynamicStyles.modalText}>{modalMessage}</Text>

                        <View style={dynamicStyles.modalActions}>
                            {showRetryButton ? (
                                <GradientButton
                                    title={t('auth.login.tryAgain')}
                                    onPress={() => {
                                        setModalVisible(false);
                                        void handleLogin();
                                    }}
                                    style={dynamicStyles.retryButton}
                                />
                            ) : null}

                            <Pressable
                                style={dynamicStyles.dismissButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={dynamicStyles.dismissText}>{t('common.dismiss')}</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
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
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(8, 18, 36, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalCard: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: Colors.navy,
        marginBottom: 8,
    },
    modalText: {
        color: Colors.slateText,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 18,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    retryButton: {
        flex: 1,
    },
    dismissButton: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 14,
        backgroundColor: Colors.iconTintBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dismissText: {
        color: Colors.navy,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
});
