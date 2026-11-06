import React, { useMemo, useState } from 'react';
import { Alert, I18nManager, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LayoutGrid, Search, Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import {
    QUICK_ACCESS_CATEGORIES,
    QUICK_ACCESS_ITEMS,
    QuickAccessItem,
} from '../../data/quickAccessData';
import {
    ContentSheet,
    EmptyState,
    FilterChips,
    HeaderIconButton,
    InfoBanner,
    ScreenLayout,
    SearchField,
    ToolCard
} from '../components';

const QuickAccessScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');


    const items = useMemo(() => {
        const q = query.trim().toLowerCase();

        return QUICK_ACCESS_ITEMS.filter(item => {
            const matchesCategory = category === 'All' || item.tag === category;
            const matchesQuery =
                !q ||
                `${item.label} ${item.description} ${item.tag}`
                    .toLowerCase()
                    .includes(q);

            return matchesCategory && matchesQuery;
        });
    }, [query, category]);

    const handlePress = (item: QuickAccessItem) => {
        if (item.route) {
            navigation.navigate(item.route);
        } else {
            Alert.alert(item.label, t('common.comingSoon'));
        }
    };

    return (
        <ScreenLayout
            title={t('quickAccess.quickAccessTitle')}
            onBack={navigation.goBack}
            fixed
            headerRight={
                <HeaderIconButton label={t('quickAccess.quickAccessTitle')}>
                    <LayoutGrid size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    icon={Sparkles}
                    title={t('quickAccess.exploreTitle')}
                    subtitle={t('quickAccess.exploreSubtitle')}
                />
            }
        >
            <ContentSheet>
                <View style={{ gap: 7 }}>
                    <SearchField
                        value={query}
                        onChangeText={setQuery}
                        placeholder={t('quickAccess.searchPlaceholder')}
                    />

                    <FilterChips
                        options={QUICK_ACCESS_CATEGORIES}
                        selected={category}
                        onSelect={setCategory}
                    />

                    {items.length > 0 ? (
                        <ScrollView
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={[styles.grid, { flexDirection: 'row' }]}>
                                {items.map(item => (
                                    <ToolCard
                                        key={item.id}
                                        item={item}
                                        onPress={() => handlePress(item)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <EmptyState
                            icon={Search}
                            title={t('quickAccess.noResults')}
                            subtitle={t('quickAccess.noResultsSubtitle')}
                        />
                    )}
                </View>
            </ContentSheet>
        </ScreenLayout>
    );
};

export default QuickAccessScreen;

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 120,
    },
    grid: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },
});
