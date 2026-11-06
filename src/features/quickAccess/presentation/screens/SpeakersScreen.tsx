import React, { useMemo, useState } from 'react';
import { LayoutAnimation, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Star, Users } from 'lucide-react-native';

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

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [favorites, setFavorites] = useState<string[]>(
        SPEAKERS.filter(s => s.favorite).map(s => s.id),
    );


    const speakers = useMemo(() => {
        const q = query.trim().toLowerCase();

        return SPEAKERS.filter(speaker => {
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
    }, [query, category, onlyFavorites, favorites]);

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
            title="Speakers"
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton
                    label={
                        onlyFavorites ? 'Show all speakers' : 'Show favourites only'
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
                    title="Global Medical Experts"
                    subtitle="Meet speakers from nutrition, research and healthcare"
                />
            }
        >
            <ContentSheet>
                <SearchField
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search speakers"
                    onFilterPress={resetFilters}
                />

                <FilterChips
                    options={SPEAKER_CATEGORIES}
                    selected={category}
                    onSelect={setCategory}
                />

                {speakers.length > 0 ? (
                    <ScrollView
                        style={styles.listScroll}
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
                                ? 'No favourites yet'
                                : 'No speakers found'
                        }
                        subtitle={
                            onlyFavorites
                                ? 'Tap the star on a speaker to add them here.'
                                : 'Try a different search or category.'
                        }
                    />
                )}
            </ContentSheet>
        </ScreenLayout>
    );
};

export default SpeakersScreen;

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
