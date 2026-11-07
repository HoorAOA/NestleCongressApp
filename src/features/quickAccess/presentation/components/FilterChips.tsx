import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface FilterChipsProps {
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
    labels?: Record<string, string>;
    /** `soft` = grey inactive chips, for use on top of white cards. */
    variant?: 'default' | 'soft';
}

const FilterChips = ({
    options,
    selected,
    onSelect,
    labels,
    variant = 'default',
}: FilterChipsProps) => (
    <ScrollView
        horizontal
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        keyboardShouldPersistTaps="handled"
    >
        {options.map(option => {
            const active = option === selected;

            return (
                <Pressable
                    key={option}
                    onPress={() => onSelect(option)}
                    style={[
                        styles.chip,
                        variant === 'soft' && styles.chipSoft,
                        active && styles.chipActive,
                    ]}
                >
                    <Text style={[styles.label, active && styles.labelActive]}>
                        {labels?.[option] ?? option}
                    </Text>
                </Pressable>
            );
        })}
    </ScrollView>
);

export default FilterChips;

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 0,
    },
    row: {
        gap: 10,
        paddingVertical: 2,
    },
    chip: {
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
    chipSoft: {
        backgroundColor: Colors.sheetBackground,
    },
    chipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    label: {
        fontSize: 12,
        fontFamily: Typography.bold,
        color: Colors.slateText,
    },
    labelActive: {
        color: Colors.white,
    },
});
