import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LayoutGrid, Search, Sparkles } from 'lucide-react-native';

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
    ToolCard } from '../components';

const QuickAccessScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();

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
            Alert.alert(item.label, 'This section is coming soon.');
        }
    };

    return (
        <ScreenLayout
            title="Quick Access"
            onBack={navigation.goBack}
            fixed
            headerRight={
                <HeaderIconButton label="Quick access">
                    <LayoutGrid size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    icon={Sparkles}
                    title="Explore Congress Tools"
                    subtitle="Everything you need for the full event experience"
                />
            }
        >
            <ContentSheet>
                <SearchField
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search quick access"
                />

                <FilterChips
                    options={QUICK_ACCESS_CATEGORIES}
                    selected={category}
                    onSelect={setCategory}
                />

                {items.length > 0 ? (
                    <ScrollView
                        style={styles.listScroll}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.grid}>
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
                        title="No results found"
                        subtitle="Try a different search or category."
                    />
                )}
            </ContentSheet>
        </ScreenLayout>
    );
};

export default QuickAccessScreen;

const styles = StyleSheet.create({
    listScroll: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },
});
