import React, { useEffect, useState } from 'react';
import {
    I18nManager,
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Platform,
    StatusBar,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight, Languages, Settings } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { AppTitle, MainBackground } from '../../../../core/components';
import { useAuth } from '../../../../core/auth/AuthContext';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import { useLanguage } from '../../../../core/localization/LanguageContext';
import { applyLanguageDirection } from '../../../../core/localization/i18n';
import { LanguageStorage, type AppLanguage } from '../../../../core/storage/languageStorage';
import {
    ProfileAvatar,
    ProfileInfoCard,
    ProfileStatsGrid,
} from '../components';
import { PROFILE_INFO, PROFILE_STATS, PROFILE_USER } from '../../data/profileData';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { signOut } = useAuth();
    const { refreshDirection } = useLanguage();
    const { t, i18n } = useTranslation();
    const isRTL = I18nManager.isRTL;
    const BackIcon = isRTL ? ChevronRight : ChevronLeft;
    const [languageSheetVisible, setLanguageSheetVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>('en');

    useEffect(() => {
        const syncLanguage = async () => {
            const storedLanguage = await LanguageStorage.getLanguage();
            setSelectedLanguage(storedLanguage);
            if (i18n.language !== storedLanguage) {
                await i18n.changeLanguage(storedLanguage);
            }
        };

        syncLanguage();
    }, [i18n]);

    const handleLanguageChange = async (language: AppLanguage) => {
        await LanguageStorage.setLanguage(language);

        await i18n.changeLanguage(language);

        setSelectedLanguage(language);

        refreshDirection();

        setLanguageSheetVisible(false);
    };

    const profileInfo = PROFILE_INFO.map(item => ({
        ...item,
        label: item.label === 'Email' ? t('profile.email') : item.label === 'Phone' ? t('profile.phone') : t('profile.location'),
    }));

    const profileStats = PROFILE_STATS.map(item => ({
        ...item,
        label: item.label === 'Sessions' ? t('profile.sessions') : item.label === 'Saved' ? t('profile.saved') : t('profile.certificates'),
    }));

    return (
        <View style={styles.container}>
            <MainBackground />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces
            >
                <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }] }>
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <BackIcon size={22} color={Colors.white} />
                    </Pressable>

                    <AppTitle
                        title={t('profile.title')}
                        size={20}
                        color={Colors.white}
                        weight="extraBold"
                        align={isRTL ? 'right' : 'left'}
                        style={styles.headerTitle}
                    />

                    <View style={[styles.headerActions, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                        <Pressable
                            style={styles.iconButton}
                            onPress={() => setLanguageSheetVisible(true)}
                        >
                            <Languages size={20} color={Colors.white} />
                        </Pressable>

                        <Pressable style={styles.iconButton} onPress={signOut}>
                            <Settings size={20} color={Colors.white} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.identity}>
                    <ProfileAvatar initials={PROFILE_USER.initials} />

                    <AppTitle
                        title={PROFILE_USER.name}
                        size={24}
                        color={Colors.white}
                        weight="extraBold"
                        align="center"
                        style={{ marginTop: 16 }}
                    />

                    <Text style={styles.role}>{PROFILE_USER.role}</Text>

                    <View style={styles.idPill}>
                        <Text style={styles.idPillText}>
                            ID: {PROFILE_USER.badgeId}
                        </Text>
                    </View>
                </View>

                <View style={styles.sheet}>
                    <ProfileInfoCard items={profileInfo} />
                    <ProfileStatsGrid items={profileStats} />
                </View>
            </ScrollView>

            <Modal
                transparent
                visible={languageSheetVisible}
                animationType="slide"
                onRequestClose={() => setLanguageSheetVisible(false)}
            >
                <Pressable
                    style={styles.modalBackdrop}
                    onPress={() => setLanguageSheetVisible(false)}
                >
                    <Pressable
                        style={styles.bottomSheet}
                        onPress={event => event.stopPropagation()}
                    >
                        <Text style={styles.sheetTitle}>{t('profile.languageSheetTitle')}</Text>

                        {(['en', 'ar'] as AppLanguage[]).map(language => {
                            const isSelected = selectedLanguage === language;

                            return (
                                <Pressable
                                    key={language}
                                    style={[
                                        styles.languageOption,
                                        isSelected && styles.languageOptionSelected,
                                    ]}
                                    onPress={() => handleLanguageChange(language)}
                                >
                                    <Text
                                        style={[
                                            styles.languageOptionText,
                                            isSelected && styles.languageOptionTextSelected,
                                        ]}
                                    >
                                        {language === 'en'
                                            ? t('app.english')
                                            : t('app.arabic')}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        flexGrow: 1,
        paddingTop:
            Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 16 : 60,
    },

    header: {
        alignItems: 'center',
        gap: 14,
        paddingHorizontal: 20,
    },

    headerTitle: {
        flex: 1,
    },

    headerActions: {
        alignItems: 'center',
        gap: 8,
    },

    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundWhiteSoft,
        borderWidth: 1,
        borderColor: Colors.borderWhiteSoft,
    },

    identity: {
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 28,
    },

    role: {
        marginTop: 6,
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.roleWhiteSoft,
    },

    idPill: {
        marginTop: 14,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.goldPillBorder,
        backgroundColor: Colors.goldPillBackground,
    },

    idPillText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        letterSpacing: 0.8,
        color: Colors.gold,
    },

    sheet: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 30,
        gap: 14,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: Colors.sheetBackground,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(9, 16, 34, 0.5)',
    },
    bottomSheet: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 30,
        gap: 10,
    },
    sheetTitle: {
        fontSize: 18,
        fontFamily: Typography.extraBold,
        color: Colors.navy,
        marginBottom: 6,
    },
    languageOption: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    languageOptionSelected: {
        backgroundColor: Colors.goldPillBackground,
        borderColor: Colors.gold,
    },
    languageOptionText: {
        fontSize: 15,
        fontFamily: Typography.semiBold,
        color: Colors.navy,
    },
    languageOptionTextSelected: {
        color: Colors.gold,
    },
});
