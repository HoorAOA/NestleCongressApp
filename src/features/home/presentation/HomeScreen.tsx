import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Platform,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
import {
    Bell,
    CalendarDays,
    Users,
    Contact,
    MapPin,
    BarChart3,
    MessageSquare,
    Folder,
    Briefcase,
    Mic,
    Bookmark,
} from 'lucide-react-native';

import { AppTitle, MainBackground } from '../../../core/components';
import { Colors } from '../../../core/theme/colors';
import { Typography } from '../../../core/theme/typography';
import {
    SearchBar,
    SectionHeader,
    FeaturedEventCard,
    QuickAccessGrid,
    SessionList,
} from '../components';

const USER_NAME = 'Dr. Testing';
const SCREEN_PADDING = 20;
const GRID_GAP = 10;

const QUICK_ACCESS = [
    { label: 'Agenda', Icon: CalendarDays },
    { label: 'Speakers', Icon: Users },
    { label: 'Name Tag', Icon: Contact },
    { label: 'Venue', Icon: MapPin },
    { label: 'Voting', Icon: BarChart3 },
    { label: 'Ask Q&A', Icon: MessageSquare },
    { label: 'Resources', Icon: Folder },
    { label: 'Exhibitors', Icon: Briefcase },
];

const SESSIONS = [
    {
        time: '08:30 AM',
        tag: 'KEYNOTE',
        title: 'Opening Ceremony',
        place: 'Main Auditorium',
        Icon: Mic,
    },
    {
        time: '09:30 AM',
        tag: 'KEYNOTE',
        title: 'Welcome & Introduction',
        place: 'Dr. Hassan Ali',
        Icon: Mic,
    },
];

const HomeScreen = () => {
    const { width } = useWindowDimensions();
    const tileSize = (width - SCREEN_PADDING * 2 - GRID_GAP * 3) / 4;

    return (
        <View style={styles.container}>
            <MainBackground />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Top bar */}
                <View style={styles.topBar}>
                    <Text style={styles.brand}>NESTLÉ MEDICAL CONGRESS</Text>

                    <Pressable style={styles.bellButton}>
                        <Bell size={20} color={Colors.white} />
                        <View style={styles.bellDot} />
                    </Pressable>
                </View>

                {/* Welcome */}
                <AppTitle
                    title={`Welcome Back,\n${USER_NAME} 👋`}
                    size={28}
                    color={Colors.white}
                    weight="extraBold"
                    style={{ lineHeight: 36, marginTop: 22 }}
                />

                <SearchBar />

                <FeaturedEventCard />

                <SectionHeader title="Quick Access" />
                <QuickAccessGrid items={QUICK_ACCESS} tileSize={tileSize} />

                <SectionHeader title="Upcoming Sessions" />
                <SessionList items={SESSIONS} />
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
        flexDirection: 'row',
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
