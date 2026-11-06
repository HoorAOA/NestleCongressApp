import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

interface InfoTileProps {
    icon: LucideIcon;
    label: string;
    value: string;
    /** `soft` = grey tile (name tag), `white` = elevated white card (venue). */
    variant?: 'soft' | 'white';
    iconFilled?: boolean;
}

const InfoTile = ({
    icon: Icon,
    label,
    value,
    variant = 'soft',
    iconFilled = false,
}: InfoTileProps) => {
    return (
        <View style={[styles.tile, { flexDirection: 'row' }, variant === 'white' ? styles.white : styles.soft]}>
            <View style={styles.iconBox}>
                <Icon
                    size={20}
                    color={Colors.primary}
                    fill={iconFilled ? Colors.primary : 'none'}
                />
            </View>

            <View style={styles.text}>
                <Text style={[styles.label, { textAlign: 'start' }]}>{label}</Text>
                <Text style={[styles.value, { textAlign: 'start' }]}>{value}</Text>
            </View>
        </View>
    );
};

export default InfoTile;

const styles = StyleSheet.create({
    tile: {
        alignItems: 'center',
        gap: 14,
        padding: 14,
        borderRadius: 22,
    },
    soft: {
        backgroundColor: Colors.sheetBackground,
    },
    white: {
        padding: 18,
        borderRadius: 28,
        backgroundColor: Colors.white,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.iconTintBlue,
    },
    text: {
        flex: 1,
        gap: 3,
    },
    label: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.mutedText,
    },
    value: {
        fontSize: 15,
        lineHeight: 21,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
});
