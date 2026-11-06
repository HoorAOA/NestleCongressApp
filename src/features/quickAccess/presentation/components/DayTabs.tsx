import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface DayTab {
    day: number;
    label: string;
    shortDate: string;
}

interface DayTabsProps {
    days: DayTab[];
    selected: number;
    onSelect: (day: number) => void;
}

const DayTabs = ({ days, selected, onSelect }: DayTabsProps) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <View style={[styles.row, { flexDirection: 'row' }]}>
            {days.map(({ day, label, shortDate }) => {
                const active = day === selected;

                return (
                    <Pressable
                        key={day}
                        onPress={() => onSelect(day)}
                        style={[styles.tab, active && styles.tabActive]}
                    >
                        <Text style={[styles.label, active && styles.labelActive, { textAlign: isRTL ? 'right' : 'left' }]}>
                            {label}
                        </Text>
                        <Text style={[styles.date, active && styles.dateActive, { textAlign: isRTL ? 'right' : 'left' }]}>
                            {shortDate}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default DayTabs;

const styles = StyleSheet.create({
    row: {
        gap: 14,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingVertical: 16,
        borderRadius: 22,
        backgroundColor: Colors.glassFill,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    tabActive: {
        backgroundColor: Colors.gold,
        borderColor: Colors.gold,
    },
    label: {
        fontSize: 15,
        fontFamily: Typography.extraBold,
        color: Colors.white,
    },
    labelActive: {
        color: Colors.navyText,
    },
    date: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.whiteSoft,
    },
    dateActive: {
        color: Colors.navyText,
    },
});
