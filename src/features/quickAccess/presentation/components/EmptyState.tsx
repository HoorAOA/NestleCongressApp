import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

const EmptyState = ({ icon: Icon, title, subtitle }: EmptyStateProps) => (
    <View style={styles.container}>
        <View style={styles.iconBox}>
            <Icon size={26} color={Colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
);

export default EmptyState;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 36,
        gap: 8,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.iconTintBlue,
    },
    title: {
        marginTop: 6,
        fontSize: 16,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.mutedText,
        textAlign: 'center',
    },
});
