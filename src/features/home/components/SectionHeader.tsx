import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { Colors } from '../../../core/theme/colors';
import { Typography } from '../../../core/theme/typography';

type SectionHeaderProps = {
    title: string;
};

const SectionHeader = ({ title }: SectionHeaderProps) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable style={styles.viewAll} hitSlop={8}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={14} color={Colors.blueBright} />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 28,
        marginBottom: 14,
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Typography.extraBold,
    },
    viewAll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    viewAllText: {
        color: Colors.blueBright,
        fontSize: 12,
        fontFamily: Typography.bold,
    },
});

export default SectionHeader;
