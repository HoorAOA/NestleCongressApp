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

import {
    UserRound,
    LockKeyhole,
    ArrowRight,
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
    ShieldBadge,
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

    return (
        <View style={styles.container}>
            <MainBackground />

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces
                >
                    {/* Hero */}
                    <View style={styles.hero}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                NESTLÉ MEDICAL CONGRESS
                            </Text>
                        </View>

                        <View style={styles.titleWrap}>
                            <Text style={styles.titleWhite}>NESTLÉ</Text>
                            <Text style={styles.titleGold}>CONGRESS</Text>
                        </View>

                        <View style={styles.bottomLine} />

                        <Text style={styles.tagline}>
                            The Next Era of{'\n'}Nutrition & Health
                        </Text>
                    </View>

                    <WhiteCard>
                        {/* Header */}
                        <View style={styles.cardHeader}>
                            <View style={styles.header}>
                                <AppTitle
                                    title="Welcome Back"
                                    size={24}
                                    color={Colors.textPrimary}
                                    weight="extraBold"
                                    style={{ lineHeight: 28 }}
                                />

                                <AppTitle
                                    title={'Sign in to continue your congress\nexperience'}
                                    size={12}
                                    color={Colors.textSecondary}
                                    weight="medium"
                                    style={{ lineHeight: 18 }}
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
                        <View style={styles.form}>
                            <AppTextInput
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                leftIcon={<UserRound size={18} color={Colors.blue} />}
                            />

                            <AppTextInput
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                isPassword
                                leftIcon={
                                    <LockKeyhole size={18} color={Colors.blue} />
                                }
                            />

                            <GradientButton
                                title="Sign In"
                                onPress={handleLogin}
                                endIcon={
                                    <ArrowRight size={20} color={Colors.white} />
                                }
                            />
                        </View>

                        {/* Social login */}
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>
                                OR CONTINUE WITH
                            </Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialRow}>
                            <SocialButton onPress={handleGoogle}>
                                <GoogleIcon />
                            </SocialButton>
                            <SocialButton onPress={handleApple}>
                                <AppleIcon />
                            </SocialButton>
                        </View>

                        {/* Forgot password */}
                        <View style={styles.forgotRow}>
                            <LockKeyhole size={14} color={Colors.blue} />
                            <AppTextButton
                                title="Forgot Password?"
                                color={Colors.blue}
                                onPress={handleForgotPassword}
                            />
                        </View>
                    </WhiteCard>

                    {/* Register */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>
                            Don't have an account?
                        </Text>
                        <Pressable
                            onPress={handleRegister}
                            style={styles.registerLink}
                            hitSlop={8}
                        >
                            <Text style={styles.registerLinkText}>
                                Create Account
                            </Text>
                            <ArrowRight size={14} color={Colors.gold} />
                        </Pressable>
                    </View>

                    {/* Feature chips */}
                    <View style={styles.featuresContainer}>
                        <FeatureItem
                            icon={<Users size={16} color={Colors.blueBright} />}
                            label={'Global\nExperts'}
                        />
                        <FeatureDivider />
                        <FeatureItem
                            icon={<CalendarCheck size={16} color={Colors.blueBright} />}
                            label={'Knowledge\nSessions'}
                        />
                        <FeatureDivider />
                        <FeatureItem
                            icon={<Star size={16} color={Colors.gold} />}
                            label={'Networking\nOpportunities'}
                            tone="gold"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
    },

    header: {
        flex: 1,
        gap: 7,
    },

    form: {
        marginTop: 12,
        gap: 12,
    },

    dividerRow: {
        flexDirection: 'row',
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
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },

    forgotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 18,
    },

    /* Register */
    registerContainer: {
        flexDirection: 'row',
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
        flexDirection: 'row',
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
        flexDirection: 'row',
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
