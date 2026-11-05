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
import { useNavigation } from '@react-navigation/native';

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
} from '../../../core/components';

import { Colors } from '../../../core/theme/colors';
import { Typography } from '../../../core/theme/typography';

const RegisterScreen = () => {
    const navigation = useNavigation<any>();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleRegister = () => {
        console.log({ fullName, email, organization, password, agreed });
    };

    const handleSignIn = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Login');
        }
    };

    const handleGoogle = () => console.log('Google sign up');
    const handleApple = () => console.log('Apple sign up');

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
                        <AppTitle
                            title="Join the"
                            size={30}
                            color={Colors.white}
                            weight="extraBold"
                            align="center"
                            style={{ lineHeight: 36 }}
                        />
                        <AppTitle
                            title="NESTLÉ"
                            size={34}
                            color={Colors.gold}
                            weight="extraBold"
                            align="center"
                            style={{ lineHeight: 40, letterSpacing: 1 }}
                        />
                        <AppTitle
                            title="CONGRESS"
                            size={34}
                            color={Colors.gold}
                            weight="extraBold"
                            align="center"
                            style={{ lineHeight: 40, letterSpacing: 1 }}
                        />

                        <AppTitle
                            title={
                                'Create your attendee profile and access\nsessions, resources, voting and Q&A.'
                            }
                            size={12}
                            color="rgba(255,255,255,0.8)"
                            weight="medium"
                            align="center"
                            style={{ lineHeight: 18, marginTop: 14 }}
                        />
                    </View>

                    <WhiteCard>
                        <View style={styles.form}>
                            <AppTextInput
                                placeholder="Full name"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                leftIcon={
                                    <UserRound size={18} color={Colors.blue} />
                                }
                            />

                            <AppTextInput
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                leftIcon={
                                    <Mail size={18} color={Colors.blue} />
                                }
                            />

                            <AppTextInput
                                placeholder="Hospital / Organization"
                                value={organization}
                                onChangeText={setOrganization}
                                autoCapitalize="words"
                                leftIcon={
                                    <Building2 size={18} color={Colors.blue} />
                                }
                            />

                            <AppTextInput
                                placeholder="Create password"
                                value={password}
                                onChangeText={setPassword}
                                isPassword
                                leftIcon={
                                    <LockKeyhole size={18} color={Colors.blue} />
                                }
                            />

                            <AppCheckbox
                                label="I agree to the congress terms, privacy policy and attendee guidelines."
                                checked={agreed}
                                onChange={setAgreed}
                            />

                            <GradientButton
                                title="Create Account"
                                onPress={handleRegister}
                                startIcon={
                                    <UserPlus size={20} color={Colors.white} />
                                }
                            />
                        </View>

                        {/* Social sign up */}
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>
                                OR SIGN UP WITH
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
                    </WhiteCard>

                    {/* Sign in */}
                    <View style={styles.signInContainer}>
                        <Text style={styles.signInText}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={handleSignIn} hitSlop={8}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default RegisterScreen;

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

    /* Card */
    form: {
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
    },

    dividerText: {
        fontSize: 9,
        fontFamily: Typography.semiBold,
        letterSpacing: 0.8,
        color: Colors.textSecondary,
    },

    socialRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },

    /* Footer */
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: 20,
    },

    signInText: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: 'rgba(255,255,255,0.85)',
    },

    signInLink: {
        fontSize: 12,
        fontFamily: Typography.bold,
        color: Colors.gold,
    },
});
