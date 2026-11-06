import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

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
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <View style={[styles.statsRow, { flexDirection: 'row' }]}>
            {items.map(({ value, label, Icon }) => (
                <View key={label} style={styles.statCard}>
                    <Icon size={22} color={Colors.royal} />
                    <Text style={styles.statValue}>{value}</Text>
                    <Text style={[styles.statLabel, { textAlign: 'start' }]}>{label}</Text>
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
