import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { Facility } from '../../data/quickAccessData';

const FacilitiesCard = ({ facilities }: { facilities: Facility[] }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <View style={styles.card}>
            <AppTitle
                title="Venue Facilities"
                size={19}
                color={Colors.navyText}
                weight="extraBold"
            />

            <View style={[styles.grid, { flexDirection: 'row' }]}>
                {facilities.map(({ id, label, Icon, glyph }) => (
                    <View key={id} style={[styles.item, { flexDirection: 'row' }]}>
                        <View style={styles.iconSlot}>
                            {Icon ? (
                                <Icon size={20} color={Colors.primary} />
                            ) : (
                                <Text style={styles.glyph}>{glyph}</Text>
                            )}
                        </View>
                        <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default FacilitiesCard;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        gap: 16,
        borderRadius: 30,
        backgroundColor: Colors.white,
    },
    grid: {
        flexWrap: 'wrap',
        gap: 12,
    },
    item: {
        width: '47.5%',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderRadius: 20,
        backgroundColor: Colors.sheetBackground,
    },
    iconSlot: {
        width: 24,
        alignItems: 'center',
    },
    glyph: {
        fontSize: 22,
        fontFamily: Typography.extraBold,
        color: Colors.primary,
    },
    label: {
        fontSize: 13,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
});
