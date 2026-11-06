import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    ChevronLeft,
    Settings,
    Mail,
    Phone,
    MapPin,
    CalendarCheck,
    Bookmark,
    Award,
} from 'lucide-react-native';

import { AppTitle, MainBackground } from '../../../../core/components';
import { useAuth } from '../../../../core/auth/AuthContext';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import {
    ProfileAvatar,
    ProfileInfoCard,
    ProfileStatsGrid,
} from '../components';

const USER = {
    name: 'Huda Latheef',
    initials: 'HL',
    role: 'Medical Congress Attendee',
    badgeId: 'NMC-2026-001',
    email: 'huda@example.com',
    phone: '+971 56 283 4212',
    location: 'Dubai, UAE',
};

const STATS = [
    { value: '12', label: 'Sessions', Icon: CalendarCheck },
    { value: '05', label: 'Saved', Icon: Bookmark },
    { value: '03', label: 'Certificates', Icon: Award },
];

const INFO = [
    { label: 'Email', value: USER.email, Icon: Mail },
    { label: 'Phone', value: USER.phone, Icon: Phone },
    { label: 'Location', value: USER.location, Icon: MapPin },
];

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { signOut } = useAuth();

    return (
        <View style={styles.container}>
            <MainBackground />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                bounces
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <ChevronLeft size={22} color={Colors.white} />
                    </Pressable>

                    <AppTitle
                        title="My Profile"
                        size={20}
                        color={Colors.white}
                        weight="extraBold"
                        style={styles.headerTitle}
                    />

                    {/* Settings button signs the user out for now */}
                    <Pressable style={styles.iconButton} onPress={signOut}>
                        <Settings size={20} color={Colors.white} />
                    </Pressable>
                </View>

                {/* Identity */}
                <View style={styles.identity}>
                    <ProfileAvatar initials={USER.initials} />

                    <AppTitle
                        title={USER.name}
                        size={24}
                        color={Colors.white}
                        weight="extraBold"
                        align="center"
                        style={{ marginTop: 16 }}
                    />

                    <Text style={styles.role}>{USER.role}</Text>

                    <View style={styles.idPill}>
                        <Text style={styles.idPillText}>
                            ID: {USER.badgeId}
                        </Text>
                    </View>
                </View>

                {/* Details sheet */}
                <View style={styles.sheet}>
                    <ProfileInfoCard items={INFO} />
                    <ProfileStatsGrid items={STATS} />
                </View>
            </ScrollView>
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingHorizontal: 20,
    },

    headerTitle: {
        flex: 1,
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
});
