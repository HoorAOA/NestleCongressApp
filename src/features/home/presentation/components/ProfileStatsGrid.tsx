import React from 'react';
import { I18nManager, View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

type ProfileStat = {
    value: string;
    label: string;
    Icon: React.ComponentType<{ size?: number; color?: string; fill?: string }>;
};

type ProfileStatsGridProps = {
    items: ProfileStat[];
};

const ProfileStatsGrid = ({ items }: ProfileStatsGridProps) => {
    const isRTL = I18nManager.isRTL;

    return (
        <View style={[styles.statsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {items.map(({ value, label, Icon }) => (
                <View key={label} style={styles.statCard}>
                    <Icon size={22} color={Colors.royal} />
                    <Text style={styles.statValue}>{value}</Text>
                    <Text style={[styles.statLabel, { textAlign: isRTL ? 'right' : 'left' }]}>{label}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    statsRow: {
        gap: 10,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        gap: 6,
        paddingVertical: 16,
        borderRadius: 20,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.borderCard,
    },
    statValue: {
        fontSize: 20,
        fontFamily: Typography.extraBold,
        color: Colors.navy,
    },
    statLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.labelMuted,
    },
});

export default ProfileStatsGrid;
export type { ProfileStat };
