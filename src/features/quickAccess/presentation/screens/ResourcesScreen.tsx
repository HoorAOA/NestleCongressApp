import React, { useMemo, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloudDownload, Folder, FolderOpen } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { downloadFile } from '../../../../core/utils/downloadFile';
import {
    RESOURCE_FILTERS,
    RESOURCES,
    ResourceItem,
} from '../../data/engagementData';
import {
    ContentSheet,
    DownloadState,
    EmptyState,
    FilterChips,
    HeaderIconButton,
    InfoBanner,
    ResourceCard,
    ScreenLayout,
    SearchField,
} from '../components';

const EMPTY_COPY: Record<string, { title: string; subtitle: string }> = {
    Videos: {
        title: 'No videos yet',
        subtitle: 'Session recordings will appear here after the congress.',
    },
    Saved: {
        title: 'Nothing saved yet',
        subtitle: 'Tap the bookmark on a resource to keep it here.',
    },
};

const ResourcesScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const insets = useSafeAreaInsets();

    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [saved, setSaved] = useState<string[]>([]);
    const [downloads, setDownloads] = useState<Record<string, DownloadState>>({});

    const items = useMemo(() => {
        const q = query.trim().toLowerCase();

        return RESOURCES.filter(item => {
            const matchesFilter =
                filter === 'All' ||
                (filter === 'Saved' && saved.includes(item.id)) ||
                item.type === filter;

            const matchesQuery =
                !q ||
                `${item.title} ${item.description} ${item.type}`
                    .toLowerCase()
                    .includes(q);

            return matchesFilter && matchesQuery;
        });
    }, [query, filter, saved]);

    const toggleSave = (id: string) =>
        setSaved(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
        );

    const setDownloadState = (id: string, state: DownloadState) =>
        setDownloads(prev => ({ ...prev, [id]: state }));

    const handleDownload = async (item: ResourceItem) => {
        if (downloads[item.id] === 'downloading') {
            return;
        }

        setDownloadState(item.id, 'downloading');

        try {
            await downloadFile(item);
            setDownloadState(item.id, 'done');
        } catch (error) {
            console.warn('Download failed, opening in browser instead:', error);
            setDownloadState(item.id, 'idle');

            try {
                await Linking.openURL(item.url);
            } catch {
                Alert.alert(
                    'Download failed',
                    'We could not download this file. Please try again later.',
                );
            }
        }
    };

    const emptyCopy = EMPTY_COPY[filter] ?? {
        title: 'No resources found',
        subtitle: 'Try a different search or category.',
    };

    return (
        <ScreenLayout
            fixed
            title="Resources"
            onBack={navigation.goBack}
            headerRight={
                <HeaderIconButton label="Resources">
                    <Folder size={20} color={Colors.gold} />
                </HeaderIconButton>
            }
            top={
                <InfoBanner
                    icon={CloudDownload}
                    title="Congress Library"
                    subtitle="Access presentations, documents and media files"
                />
            }
        >
            <ContentSheet>
                <SearchField
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search resources"
                />

                <FilterChips
                    options={RESOURCE_FILTERS}
                    selected={filter}
                    onSelect={setFilter}
                />

                {items.length > 0 ? (
                    <ScrollView
                        style={styles.list}
                        contentContainerStyle={{
                            gap: 14,
                            paddingBottom: insets.bottom + 24,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {items.map(item => (
                            <ResourceCard
                                key={item.id}
                                item={item}
                                saved={saved.includes(item.id)}
                                downloadState={downloads[item.id] ?? 'idle'}
                                onToggleSave={() => toggleSave(item.id)}
                                onDownload={() => handleDownload(item)}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <EmptyState
                        icon={FolderOpen}
                        title={emptyCopy.title}
                        subtitle={emptyCopy.subtitle}
                    />
                )}
            </ContentSheet>
        </ScreenLayout>
    );
};

export default ResourcesScreen;

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});
