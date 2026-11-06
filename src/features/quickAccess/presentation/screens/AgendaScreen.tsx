import React, { useMemo, useState } from 'react';
import { LayoutAnimation, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarDays, Search, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

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
    SheetTitleRow
} from '../components';

const AgendaScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    const [day, setDay] = useState<AgendaDay>(1);
    const [category, setCategory] = useState('All');
    const [query, setQuery] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    const categoryLabels = {
        All: t('quickAccess.agendaFilterAll'),
        Keynote: t('quickAccess.agendaFilterKeynote'),
        Nutrition: t('quickAccess.agendaFilterNutrition'),
        Research: t('quickAccess.agendaFilterResearch'),
    };

    const localizedDays = useMemo(
        () =>
            AGENDA_DAYS.map(item => ({
                ...item,
                label: isArabic ? item.labelAr : item.labelEn,
                shortDate: isArabic ? item.shortDateAr : item.shortDateEn,
                fullDate: isArabic ? item.fullDateAr : item.fullDateEn,
            })),
        [isArabic],
    );

    const localizedSessions = useMemo(
        () =>
            AGENDA_SESSIONS.map(session => ({
                ...session,
                title: isArabic ? session.titleAr : session.titleEn,
                place: isArabic ? session.placeAr : session.placeEn,
                categoryLabel: isArabic
                    ? session.category === 'Keynote'
                        ? t('quickAccess.agendaFilterKeynote')
                        : session.category === 'Nutrition'
                          ? t('quickAccess.agendaFilterNutrition')
                          : t('quickAccess.agendaFilterResearch')
                    : session.category,
            })),
        [isArabic, t],
    );

    const currentDay = localizedDays.find(d => d.day === day) ?? localizedDays[0];

    const sessions = useMemo(() => {
        const q = query.trim().toLowerCase();

        return localizedSessions.filter(session => {
            const matchesDay = session.day === day;
            const matchesCategory =
                category === 'All' || session.category === category;
            const matchesQuery =
                !q ||
                `${session.title} ${session.place} ${session.categoryLabel ?? session.category}`
                    .toLowerCase()
                    .includes(q);

            return matchesDay && matchesCategory && matchesQuery;
        }).sort(
            (a, b) =>
                Number(bookmarks.includes(b.id)) -
                Number(bookmarks.includes(a.id)) || a.order - b.order,
        );
    }, [day, category, query, bookmarks, localizedSessions]);

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
            title={t('quickAccess.congressAgenda')}
            onBack={navigation.goBack}
            fixed
            headerRight={
                <HeaderIconButton
                    label={searchVisible ? t('common.closeSearch') : t('quickAccess.searchSessions')}
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
                        title={`${currentDay.label} ${t('quickAccess.schedule')}`}
                        subtitle={currentDay.fullDate}
                    />

                    <DayTabs
                        days={localizedDays}
                        selected={day}
                        onSelect={d => setDay(d as AgendaDay)}
                    />
                </>
            }
        >
            <ContentSheet>
                <View style={{ gap: 7 }}>
                    <SheetTitleRow
                        title={t('quickAccess.todaysSessions')}
                        actionLabel={t('quickAccess.reset')}
                        onActionPress={reset}
                    />

                    {searchVisible && (
                        <SearchField
                            value={query}
                            onChangeText={setQuery}
                            placeholder={t('quickAccess.searchSessions')}
                            autoFocus
                        />
                    )}

                    <FilterChips
                        options={AGENDA_CATEGORIES}
                        labels={categoryLabels}
                        selected={category}
                        onSelect={setCategory}
                    />

                    {sessions.length > 0 ? (
                        <ScrollView
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
                            title={t('quickAccess.noSessions')}
                            subtitle={t('quickAccess.noSessionsSubtitle')}
                        />
                    )}
                </View>
            </ContentSheet>
        </ScreenLayout>
    );
};

export default AgendaScreen;

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 120,
    },
    list: {
        gap: 14,
    },
});
