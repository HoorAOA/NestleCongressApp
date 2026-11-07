import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { AlignJustify, Bookmark, Check, Download } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { ResourceItem, ResourceTone } from '../../data/engagementData';

export type DownloadState = 'idle' | 'downloading' | 'done';

const TONES: Record<ResourceTone, { color: string; tint: string }> = {
    red: { color: Colors.danger, tint: Colors.dangerTint },
    blue: { color: Colors.primary, tint: Colors.iconTintBlue },
    gold: { color: Colors.gold, tint: Colors.iconTintGold },
};

interface ResourceCardProps {
    item: ResourceItem;
    saved: boolean;
    downloadState: DownloadState;
    onToggleSave: () => void;
    onDownload: () => void;
}

const ResourceCard = ({
    item,
    saved,
    downloadState,
    onToggleSave,
    onDownload,
}: ResourceCardProps) => {
    const { Icon } = item;
    const tone = TONES[item.tone];
    const { t } = useTranslation();

    return (
        <View style={styles.card}>
            <View style={[styles.iconTile, { backgroundColor: tone.tint }]}>
                <Icon size={30} color={tone.color} />
            </View>

            <View style={styles.body}>
                <Text style={[styles.tag, { color: tone.color }]}>
                    {item.type.toUpperCase()}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                    {item.description}
                </Text>

                <View style={styles.sizeRow}>
                    <AlignJustify size={14} color={Colors.mutedText} />
                    <Text style={styles.size}>{item.size}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Pressable
                    onPress={onToggleSave}
                    hitSlop={10}
                    accessibilityLabel={saved ? t('quickAccess.resourcesRemoveSave') : t('quickAccess.resourcesSave')}
                >
                    <Bookmark
                        size={24}
                        color={saved ? Colors.gold : Colors.mutedText}
                        fill={saved ? Colors.gold : 'none'}
                    />
                </Pressable>

                <Pressable
                    onPress={onDownload}
                    disabled={downloadState === 'downloading'}
                    hitSlop={10}
                    accessibilityLabel={t('quickAccess.resourcesDownload')}
                    style={styles.download}
                >
                    {downloadState === 'downloading' ? (
                        <ActivityIndicator size="small" color={Colors.primary} />
                    ) : downloadState === 'done' ? (
                        <Check size={24} color={Colors.primary} strokeWidth={3} />
                    ) : (
                        <Download size={24} color={Colors.mutedText} />
                    )}
                </Pressable>
            </View>
        </View>
    );
};

export default ResourceCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 16,
        borderRadius: 26,
        backgroundColor: Colors.white,
        shadowColor: Colors.navyText,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    iconTile: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        gap: 3,
    },
    tag: {
        fontSize: 9,
        letterSpacing: 1,
        fontFamily: Typography.extraBold,
    },
    title: {
        fontSize: 16,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    description: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.slateText,
    },
    sizeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    size: {
        fontSize: 11,
        fontFamily: Typography.semiBold,
        color: Colors.mutedText,
    },
    actions: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    download: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
