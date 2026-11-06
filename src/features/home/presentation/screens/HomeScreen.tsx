import React from 'react';
import {
    I18nManager,
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Platform,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { AppTitle, MainBackground } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import {
    SearchBar,
    SectionHeader,
    FeaturedEventCard,
    QuickAccessGrid,
    SessionList,
} from '../components';

import { useNavigation } from '@react-navigation/native';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { QUICK_ACCESS_ROUTES } from '../../../quickAccess/data/quickAccessData';
import { HOME_QUICK_ACCESS, HOME_SESSIONS, HOME_USER_NAME } from '../../data/homeData';

const SCREEN_PADDING = 20;
const GRID_GAP = 10;

const HomeScreen = () => {
    const { width } = useWindowDimensions();
    const tileSize = (width - SCREEN_PADDING * 2 - GRID_GAP * 3) / 4;
    const navigation = useNavigation<RootNavigationProp>();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    const quickAccessItems = HOME_QUICK_ACCESS.map(item => {
        const labels: Record<string, string> = {
            Agenda: t('quickAccess.agenda'),
            Speakers: t('quickAccess.speakers'),
            'Name Tag': t('quickAccess.nameTag'),
            Venue: t('quickAccess.venue'),
            Voting: t('quickAccess.voting'),
            'Ask Q&A': t('quickAccess.askQa'),
            Resources: t('quickAccess.resources'),
            Exhibitors: t('quickAccess.exhibitors'),
        };

        return { ...item, label: labels[item.label] ?? item.label };
    });

    const openQuickAccessItem = (label: string) => {
        const selectedItem = quickAccessItems.find(item => item.label === label);
        const route = selectedItem?.route ?? QUICK_ACCESS_ROUTES[selectedItem?.label ?? label];

        if (route) {
            navigation.navigate(route);
        }
    };

    return (
        <View style={styles.container}>
            <MainBackground />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[styles.topBar, { flexDirection: 'row' }]}>
                    <Text style={[styles.brand, { textAlign: isRTL ? 'right' : 'left' }]}>{t('home.brand')}</Text>

                    <Pressable style={styles.bellButton}>
                        <Bell size={20} color={Colors.white} />
                        <View style={[styles.bellDot, { right: isRTL ? undefined : 10, left: isRTL ? 10 : undefined }]} />
                    </Pressable>
                </View>

                <AppTitle
                    title={`${t('home.welcome')}\n${HOME_USER_NAME} 👋`}
                    size={28}
                    color={Colors.white}
                    weight="extraBold"
                    style={{ lineHeight: 36, marginTop: 22 }}
                />

                <SearchBar />

                <FeaturedEventCard />

                <SectionHeader
                    title={t('home.quickAccess')}
                    onViewAllPress={() => navigation.navigate('QuickAccess')}
                />
                <QuickAccessGrid
                    items={quickAccessItems}
                    tileSize={tileSize}
                    onItemPress={openQuickAccessItem}
                />

                <SectionHeader
                    title={t('home.upcomingSessions')}
                    onViewAllPress={() => navigation.navigate('Agenda')}
                />
                <SessionList items={HOME_SESSIONS} />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        paddingHorizontal: SCREEN_PADDING,
        paddingTop:
            Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 16 : 60,
        paddingBottom: 30,
    },

    topBar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    brand: {
        color: Colors.white,
        fontSize: 11,
        fontFamily: Typography.semiBold,
        letterSpacing: 1.4,
    },

    bellButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundWhiteSoft,
    },

    bellDot: {
        position: 'absolute',
        top: 9,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.alert,
    },
});
