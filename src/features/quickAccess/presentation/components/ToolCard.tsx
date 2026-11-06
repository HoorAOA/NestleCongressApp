import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { QuickAccessItem } from '../../data/quickAccessData';

import GradientBox from './GradientBox';

interface ToolCardProps {
    item: QuickAccessItem;
    onPress: () => void;
}

const ToolCard = ({ item, onPress }: ToolCardProps) => {
    const { Icon } = item;
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
        >
            <GradientBox
                radius={18}
                colors={[Colors.secondary, Colors.primary]}
                style={styles.iconBox}
            >
                <Icon size={24} color={Colors.white} />
            </GradientBox>

            <Text style={styles.title}>{item.label}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={[styles.footer, { flexDirection: 'row' }]}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                </View>
                <ArrowRight size={18} color={Colors.primary} />
            </View>
        </Pressable>
    );
};

export default ToolCard;

const styles = StyleSheet.create({
    card: {
        width: '47.8%',
        padding: 16,
        borderRadius: 26,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
        shadowColor: Colors.navyText,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    iconBox: {
        width: 54,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.secondary,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    title: {
        marginTop: 22,
        fontSize: 17,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    description: {
        marginTop: 6,
        minHeight: 32,
        fontSize: 11,
        lineHeight: 16,
        fontFamily: Typography.medium,
        color: Colors.slateText,
    },
    footer: {
        marginTop: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: Colors.iconTintGold,
    },
    tagText: {
        fontSize: 9,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
});
