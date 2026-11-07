import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface SegmentTabsProps {
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
}

const SegmentTabs = ({ options, selected, onSelect }: SegmentTabsProps) => (
    <View style={styles.row}>
        {options.map(option => {
            const active = option === selected;

            return (
                <Pressable
                    key={option}
                    onPress={() => onSelect(option)}
                    style={[styles.tab, active && styles.tabActive]}
                >
                    <Text style={[styles.label, active && styles.labelActive]}>
                        {option}
                    </Text>
                </Pressable>
            );
        })}
    </View>
);

export default SegmentTabs;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    tab: {
        flex: 1,
        height: 50,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    tabActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    label: {
        fontSize: 14,
        fontFamily: Typography.extraBold,
        color: Colors.slateText,
    },
    labelActive: {
        color: Colors.navyText,
    },
});
