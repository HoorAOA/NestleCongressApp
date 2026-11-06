import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react-native';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

import GradientBox from './GradientBox';

interface InfoBannerProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    tone?: 'blue' | 'gold';
}

const InfoBanner = ({
    icon: Icon,
    title,
    subtitle,
    tone = 'blue',
}: InfoBannerProps) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <View style={[styles.card, { flexDirection: 'row' }]}>
            <GradientBox
                radius={18}
                colors={
                    tone === 'gold'
                        ? [Colors.gold, Colors.goldDeep]
                        : [Colors.secondary, Colors.primary]
                }
                style={styles.iconBox}
            >
                <Icon size={26} color={Colors.white} />
            </GradientBox>

            <View style={styles.text}>
                <AppTitle
                    title={title}
                    size={18}
                    color={Colors.white}
                    weight="extraBold"
                    style={{ lineHeight: 24, textAlign: 'start' }}
                />
                <Text style={[styles.subtitle, { textAlign: 'start' }]}>{subtitle}</Text>
            </View>
        </View>
    );
};

export default InfoBanner;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        gap: 16,
        padding: 18,
        borderRadius: 26,
        backgroundColor: Colors.glassFill,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    iconBox: {
        width: 62,
        height: 62,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        gap: 4,
    },
    subtitle: {
        fontSize: 11,
        lineHeight: 16,
        fontFamily: Typography.medium,
        color: Colors.whiteSoft,
    },
});
