import React, { useMemo, useState } from 'react';
import { LayoutAnimation, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarDays, Search, X } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import {
    AGENDA_CATEGORIES,
    AGENDA_DAYS,
    AGENDA_SESSIONS,
    AgendaDay,
} from '../../data/quickAccessData';
import {
    AgendaSessionCard,
    ContentSheet,
    DayTabs,
    EmptyState,
    FilterChips,
    HeaderIconButton,
    InfoBanner,
    ScreenLayout,
    SearchField,
    SheetTitleRow } from '../components';

const AgendaScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();

    const [day, setDay] = useState<AgendaDay>(1);
    const [category, setCategory] = useState('All');
    const [query, setQuery] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [bookmarks, setBookmarks] = useState<string[]>([]);


    const currentDay = AGENDA_DAYS.find(d => d.day === day) ?? AGENDA_DAYS[0];

    const sessions = useMemo(() => {
        const q = query.trim().toLowerCase();

        return AGENDA_SESSIONS.filter(session => {
            const matchesDay = session.day === day;
            const matchesCategory =
                category === 'All' || session.category === category;
            const matchesQuery =
                !q ||
                `${session.title} ${session.place} ${session.category}`
                    .toLowerCase()
                    .includes(q);

            return matchesDay && matchesCategory && matchesQuery;
        }).sort(
            (a, b) =>
                Number(bookmarks.includes(b.id)) -
                    Number(bookmarks.includes(a.id)) || a.order - b.order,
        );
    }, [day, category, query, bookmarks]);

    const toggleBookmark = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setBookmarks(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
        );
    };

    const toggleSearch = () => {
        if (searchVisible) {
            setQuery('');
        }
        setSearchVisible(prev => !prev);
    };

    const reset = () => {
        setCategory('All');
        setQuery('');
        setSearchVisible(false);
    };

    return (
        <ScreenLayout
            title="Congress Agenda"
            onBack={navigation.goBack}
            fixed
            headerRight={
                <HeaderIconButton
                    label={searchVisible ? 'Close search' : 'Search sessions'}
                    onPress={toggleSearch}
                >
                    {searchVisible ? (
                        <X size={20} color={Colors.white} />
                    ) : (
                        <Search size={20} color={Colors.white} />
                    )}
                </HeaderIconButton>
            }
            top={
                <>
                    <InfoBanner
                        tone="gold"
                        icon={CalendarDays}
                        title={`${currentDay.label} Schedule`}
                        subtitle={currentDay.fullDate}
                    />

                    <DayTabs
                        days={AGENDA_DAYS}
                        selected={day}
                        onSelect={d => setDay(d as AgendaDay)}
                    />
                </>
            }
        >
            <ContentSheet>
                <SheetTitleRow
                    title="Today’s Sessions"
                    actionLabel="Reset"
                    onActionPress={reset}
                />

                {searchVisible && (
                    <SearchField
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search sessions"
                        autoFocus
                    />
                )}

                <FilterChips
                    options={AGENDA_CATEGORIES}
                    selected={category}
                    onSelect={setCategory}
                />

                {sessions.length > 0 ? (
                    <ScrollView
                        style={styles.listScroll}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.list}>
                            {sessions.map(session => (
                                <AgendaSessionCard
                                    key={session.id}
                                    session={session}
                                    bookmarked={bookmarks.includes(session.id)}
                                    onToggleBookmark={() => toggleBookmark(session.id)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <EmptyState
                        icon={Search}
                        title="No sessions found"
                        subtitle="Try a different search or category."
                    />
                )}
            </ContentSheet>
        </ScreenLayout>
    );
};

export default AgendaScreen;

const styles = StyleSheet.create({
    listScroll: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 12,
    },
    list: {
        gap: 14,
    },
});
