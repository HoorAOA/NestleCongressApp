import React from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import { CalendarDays } from 'lucide-react-native';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface VenueHeroCardProps {
    name: string;
    dates: string;
}

const VenueHeroCard = ({ name, dates }: VenueHeroCardProps) => {
    const isRTL = I18nManager.isRTL;

    return (
        <View style={styles.card}>
            <AppTitle
                title={name}
                size={22}
                color={Colors.white}
                weight="extraBold"
                align={isRTL ? 'right' : 'left'}
                style={{ lineHeight: 30 }}
            />

            <View style={[styles.dateRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <CalendarDays size={17} color={Colors.blueBright} />
                <Text style={[styles.date, { textAlign: isRTL ? 'right' : 'left' }]}>{dates}</Text>
            </View>
        </View>
    );
};

export default VenueHeroCard;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        gap: 14,
        borderRadius: 28,
        backgroundColor: Colors.glassFill,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    dateRow: {
        alignItems: 'center',
        gap: 8,
    },
    date: {
        fontSize: 13,
        fontFamily: Typography.medium,
        color: Colors.whiteSoftAlt5,
    },
});
