import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../../core/theme/colors';
import { Typography } from '../../../core/theme/typography';

type ProfileInfoItem = {
    label: string;
    value: string;
    Icon: React.ComponentType<{ size?: number; color?: string; fill?: string }>;
};

type ProfileInfoCardProps = {
    items: ProfileInfoItem[];
};

const ProfileInfoCard = ({ items }: ProfileInfoCardProps) => (
    <View style={styles.infoCard}>
        {items.map(({ label, value, Icon }, index) => (
            <View key={label}>
                <View style={styles.infoRow}>
                    <View style={styles.infoIcon}>
                        <Icon size={18} color={Colors.royal} />
                    </View>

                    <View>
                        <Text style={styles.infoLabel}>{label}</Text>
                        <Text style={styles.infoValue}>{value}</Text>
                    </View>
                </View>

                {index < items.length - 1 && <View style={styles.infoDivider} />}
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    infoCard: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 22,
        backgroundColor: Colors.white,
        shadowColor: Colors.shadowSoft,
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 12,
    },
    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.infoSoft,
    },
    infoLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.muted,
    },
    infoValue: {
        marginTop: 2,
        fontSize: 15,
        fontFamily: Typography.extraBold,
        color: Colors.navy,
    },
    infoDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
    },
});

export default ProfileInfoCard;
export type { ProfileInfoItem };
