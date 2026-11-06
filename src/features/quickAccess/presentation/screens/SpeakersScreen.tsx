import React, { useMemo, useState } from 'react';
import { LayoutAnimation, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Star, Users } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { SPEAKER_CATEGORIES, SPEAKERS } from '../../data/quickAccessData';
import {
    ContentSheet,
    EmptyState,
    FilterChips,
    HeaderIconButton,
    InfoBanner,
    ScreenLayout,
    SearchField,
    SpeakerCard
} from '../components';

const SpeakersScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [favorites, setFavorites] = useState<string[]>(
        SPEAKERS.filter(s => s.favorite).map(s => s.id),
    );

    const categoryLabels = {
        All: t('quickAccess.speakersFilterAll'),
        Nutrition: t('quickAccess.speakersFilterNutrition'),
        Research: t('quickAccess.speakersFilterResearch'),
        Pediatrics: t('quickAccess.speakersFilterPediatrics'),
    };

    const localizedSpeakers = useMemo(
        () =>
            SPEAKERS.map(speaker => ({
                ...speaker,
                name: isArabic ? speaker.nameAr : speaker.nameEn,
                role: isArabic ? speaker.roleAr : speaker.roleEn,
                country: isArabic ? speaker.countryAr : speaker.countryEn,
                topic: isArabic ? speaker.topicAr : speaker.topicEn,
            })),
        [isArabic],
    );

    const speakers = useMemo(() => {
        const q = query.trim().toLowerCase();

        return localizedSpeakers.filter(speaker => {
            const matchesFavorite = !onlyFavorites || favorites.includes(speaker.id);
            const matchesCategory =
                category === 'All' ||
                speaker.categories.some(c => c === category);
            const matchesQuery =
                !q ||
                `${speaker.name} ${speaker.role} ${speaker.country} ${speaker.topic}`
                    .toLowerCase()
                    .includes(q);

            return matchesFavorite && matchesCategory && matchesQuery;
        }).sort(
            (a, b) =>
                Number(favorites.includes(b.id)) -
                Number(favorites.includes(a.id)),
        );
    }, [query, category, onlyFavorites, favorites, localizedSpeakers]);

    const toggleFavorite = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
        );
    };

    const resetFilters = () => {
        setQuery('');
        setCategory('All');
        setOnlyFavorites(false);
    };

    return (
        <ScreenLayout
            fixed
            title={t('quickAccess.speakersTitle')}
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton
                    label={
                        onlyFavorites ? t('quickAccess.showAllSpeakers') : t('quickAccess.showFavoritesOnly')
                    }
                    onPress={() => setOnlyFavorites(prev => !prev)}
                >
                    <Star
                        size={20}
                        color={Colors.gold}
                        fill={onlyFavorites ? Colors.gold : 'none'}
                    />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    icon={Users}
                    title={t('quickAccess.globalExperts')}
                    subtitle={t('quickAccess.globalExpertsSubtitle')}
                />
            }
        >
            <ContentSheet>
                <View style={{gap: 7 }}>
                    <SearchField
                        value={query}
                        onChangeText={setQuery}
                        placeholder={t('quickAccess.searchSpeakers')}
                        onFilterPress={resetFilters}
                    />

                    <FilterChips
                        options={SPEAKER_CATEGORIES}
                        labels={categoryLabels}
                        selected={category}
                        onSelect={setCategory}
                    />

                    {speakers.length > 0 ? (
                        <ScrollView
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.list}>
                                {speakers.map(speaker => (
                                    <SpeakerCard
                                        key={speaker.id}
                                        speaker={speaker}
                                        isFavorite={favorites.includes(speaker.id)}
                                        onToggleFavorite={() => toggleFavorite(speaker.id)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <EmptyState
                            icon={onlyFavorites ? Star : Search}
                            title={
                                onlyFavorites
                                    ? t('quickAccess.noFavorites')
                                    : t('quickAccess.noSpeakers')
                            }
                            subtitle={
                                onlyFavorites
                                    ? t('quickAccess.noFavoritesSubtitle')
                                    : t('quickAccess.noResultsSubtitle')
                            }
                        />
                    )}
                </View>
            </ContentSheet>
        </ScreenLayout>
    );
};

export default SpeakersScreen;

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 120,
    },
    list: {
        gap: 14,
    },
});
