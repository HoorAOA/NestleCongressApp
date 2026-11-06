import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';
import type { Speaker } from '../../data/quickAccessData';

import AvatarRing from './AvatarRing';

interface SpeakerCardProps {
    speaker: Speaker;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onPress?: () => void;
}

const SpeakerCard = ({
    speaker,
    isFavorite,
    onToggleFavorite,
    onPress,
}: SpeakerCardProps) => {
    const featured = !!speaker.featured;
    const { i18n } = useTranslation();
    const isRTL = i18n.dir(i18n.language) === 'rtl';
    const EndIcon = isRTL ? ChevronLeft : ChevronRight;

    return (
        <Pressable
            onPress={onPress}
            style={[styles.card, { flexDirection: 'row' }, featured && styles.cardFeatured]}
        >
            <AvatarRing
                initials={speaker.initials}
                size={76}
                colors={
                    featured
                        ? [Colors.gold, Colors.secondary]
                        : [Colors.secondary, Colors.primary]
                }
            />

            <View style={styles.body}>
                <Text
                    style={[
                        styles.label,
                        { color: featured ? Colors.gold : Colors.primary },
                    ]}
                >
                    {featured ? 'FEATURED SPEAKER' : 'SPEAKER'}
                </Text>
                <Text style={styles.name}>{speaker.name}</Text>
                <Text style={styles.role}>{speaker.role}</Text>

                <View style={[styles.countryRow, { flexDirection: 'row' }]}>
                    <MapPin size={12} color={Colors.mutedText} />
                    <Text style={[styles.country, { textAlign: 'start' }]}>{speaker.country}</Text>
                </View>

                <View style={styles.topic}>
                    <Text style={styles.topicText} numberOfLines={1}>
                        {speaker.topic}
                    </Text>
                </View>
            </View>

            <View style={[styles.actions, { flexDirection: 'row' }]}>
                <Pressable
                    onPress={onToggleFavorite}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={
                        isFavorite ? 'Remove from favourites' : 'Add to favourites'
                    }
                >
                    <Star
                        size={22}
                        color={isFavorite ? Colors.gold : Colors.mutedText}
                        fill={isFavorite ? Colors.gold : 'none'}
                    />
                </Pressable>
                <EndIcon size={20} color={Colors.mutedText} />
            </View>
        </Pressable>
    );
};

export default SpeakerCard;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        gap: 14,
        padding: 16,
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
    body: {
        flex: 1,
        gap: 3,
    },
    label: {
        fontSize: 9,
        letterSpacing: 1,
        fontFamily: Typography.extraBold,
    },
    name: {
        fontSize: 17,
        fontFamily: Typography.extraBold,
        color: Colors.navyText,
    },
    role: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: Colors.slateText,
    },
    countryRow: {
        alignItems: 'center',
        gap: 4,
    },
    country: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.mutedText,
    },
    topic: {
        alignSelf: 'flex-start',
        marginTop: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: Colors.iconTintBlue,
    },
    topicText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    actions: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
    },
});
