import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { useLanguage } from '../../../../core/localization/LanguageContext';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

type SectionHeaderProps = {
    title: string;
    onViewAllPress?: () => void;
};

const getStyles = (isRTL: boolean) =>
    StyleSheet.create({
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
            textAlign: 'start',
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

const SectionHeader = ({ title, onViewAllPress }: SectionHeaderProps) => {
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    const styles = getStyles(isRTL);
    const Arrow = isRTL ? ChevronLeft : ChevronRight;

    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Pressable style={styles.viewAll} hitSlop={8} onPress={onViewAllPress}>
                <Text style={styles.viewAllText}>{t('home.viewAll')}</Text>
                <Arrow size={14} color={Colors.blueBright} />
            </Pressable>
        </View>
    );
};

export default SectionHeader;
