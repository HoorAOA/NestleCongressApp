import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
    Bookmark,
    CalendarCheck,
    FlaskConical,
    MapPin,
    Mic,
    Sprout,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { AgendaCategory, AgendaSession } from '../../data/quickAccessData';

const CATEGORY_ICONS: Record<AgendaCategory, LucideIcon> = {
    Keynote: Mic,
    Nutrition: Sprout,
    Research: FlaskConical,
};

interface AgendaSessionCardProps {
    session: AgendaSession;
    bookmarked: boolean;
    onToggleBookmark: () => void;
}

const AgendaSessionCard = ({
    session,
    bookmarked,
    onToggleBookmark,
}: AgendaSessionCardProps) => {
    const featured = !!session.featured;
    const Icon = featured ? CalendarCheck : CATEGORY_ICONS[session.category];
    const accent = featured ? Colors.gold : Colors.primary;
    const { i18n, t } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';
    const categoryLabel = session.categoryLabel ?? session.category;

    return (
        <View style={[styles.card, { flexDirection: 'row' }, featured && styles.cardFeatured]}>
            <View style={styles.timeColumn}>
                <Text style={styles.time}>{session.time}</Text>
                <Text style={styles.period}>{session.period}</Text>
            </View>

            <View style={styles.divider} />

            <View
                style={[
                    styles.iconBox,
                    { backgroundColor: featured ? Colors.iconTintGold : Colors.iconTintBlue },
                ]}
            >
                <Icon size={22} color={accent} />
            </View>

            <View style={styles.body}>
                <Text style={[styles.category, { color: accent, textAlign: 'start' }]}>
                    {categoryLabel.toUpperCase()}
                </Text>
                <Text style={[styles.title, { textAlign: 'start' }]}>{session.title}</Text>
                <View style={[styles.placeRow, { flexDirection: 'row' }]}>
                    <MapPin size={12} color={Colors.mutedText} />
                    <Text style={[styles.place, { textAlign: 'start' }]} numberOfLines={1}>
                        {session.place}
                    </Text>
                </View>
            </View>

            <Pressable
                onPress={onToggleBookmark}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={
                    bookmarked ? t('quickAccess.removeBookmark') : t('quickAccess.bookmarkSession')
                }
            >
                <Bookmark
                    size={22}
                    color={bookmarked ? Colors.gold : Colors.mutedText}
                    fill={bookmarked ? Colors.gold : 'none'}
                />
            </Pressable>
        </View>
    );
};

export default AgendaSessionCard;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        padding: 14,
        borderRadius: 26,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: Colors.navyText,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    cardFeatured: {
        borderColor: Colors.goldBorder,
    },
    timeColumn: {
        width: 58,
        alignItems: 'center',
    },
    time: {
        fontSize: 17,
        fontFamily: Typography.extraBold,
        color: Colors.primary,
    },
    period: {
        marginTop: 2,
        fontSize: 11,
        fontFamily: Typography.semiBold,
        color: Colors.mutedText,
    },
    divider: {
        width: 1,
        height: 56,
        marginHorizontal: 12,
        backgroundColor: Colors.cardBorder,
    },
    iconBox: {
        width: 46,
        height: 46,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        marginHorizontal: 12,
        gap: 3,
    },
    category: {
        fontSize: 9,
        letterSpacing: 1,
        fontFamily: Typography.extraBold,
    },
    title: {
        fontSize: 15,
        lineHeight: 20,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    placeRow: {
        alignItems: 'center',
        gap: 4,
    },
    place: {
        flexShrink: 1,
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.mutedText,
    },
});
