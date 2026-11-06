import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Award, CalendarDays, Contact, MapPin } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { AppTitle } from '../../../../core/components';
import { Colors } from '../../../../core/theme/colors';
import { Typography } from '../../../../core/theme/typography';

import AvatarRing from './AvatarRing';
import GradientBox from './GradientBox';
import InfoTile from './InfoTile';

interface NameTagCardProps {
    attendee: {
        name: string;
        initials: string;
        headline: string;
        badgeId: string;
        location: string;
        congressDates: string;
    };
    qrValue: string;
    onQrPress: () => void;
}

/** The ref points at the white card so it can be captured as an image. */
const NameTagCard = forwardRef<React.ElementRef<typeof View>, NameTagCardProps>(
    ({ attendee, qrValue, onQrPress }, ref) => {
        const { t } = useTranslation();

        return (
            <View ref={ref} collapsable={false} style={styles.card}>
                <GradientBox
                    radius={22}
                    colors={[Colors.secondary, Colors.primary]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.band}
                >
                    <Text style={styles.bandTitle}>NESTLÉ MEDICAL</Text>
                    <Text style={styles.bandSubtitle}>CONGRESS 2026</Text>
                </GradientBox>

                <View style={styles.identity}>
                    <AvatarRing
                        initials={attendee.initials}
                        size={96}
                        fontSize={32}
                        colors={[Colors.gold, Colors.secondary]}
                    />

                    <AppTitle
                        title={attendee.name}
                        size={26}
                        color={Colors.navyText}
                        weight="extraBold"
                        align="center"
                        style={{ marginTop: 14 }}
                    />
                    <Text style={styles.headline}>{attendee.headline}</Text>
                </View>

                <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Award size={20} color={Colors.gold} />
                    <View style={styles.line} />
                </View>

                <View style={styles.tiles}>
                    <InfoTile icon={Contact} label={t('quickAccess.badgeId')} value={attendee.badgeId} />
                    <InfoTile icon={MapPin} label={t('quickAccess.location')} value={attendee.location} />
                    <InfoTile
                        icon={CalendarDays}
                        label={t('quickAccess.congressDate')}
                        value={attendee.congressDates}
                    />
                </View>

                <Pressable
                    onPress={onQrPress}
                    accessibilityRole="link"
                    accessibilityLabel={t('quickAccess.openWebsite')}
                    style={styles.qrOuter}
                >
                    <View style={styles.qrInner}>
                        <QRCode
                            value={qrValue}
                            size={116}
                            color={Colors.navyText}
                            backgroundColor={Colors.white}
                        />
                    </View>
                </Pressable>
            </View>
        );
    },
);

NameTagCard.displayName = 'NameTagCard';

export default NameTagCard;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 34,
        backgroundColor: Colors.white,
    },
    band: {
        alignItems: 'center',
        paddingVertical: 18,
        gap: 6,
    },
    bandTitle: {
        fontSize: 14,
        letterSpacing: 1.6,
        fontFamily: Typography.extraBold,
        color: Colors.white,
    },
    bandSubtitle: {
        fontSize: 11,
        letterSpacing: 1.6,
        fontFamily: Typography.bold,
        color: Colors.gold,
    },
    identity: {
        alignItems: 'center',
        marginTop: 16,
    },
    headline: {
        marginTop: 4,
        fontSize: 13,
        fontFamily: Typography.medium,
        color: Colors.slateText,
    },
    dividerRow: {
        alignItems: 'center',
        gap: 12,
        marginVertical: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.cardBorder,
    },
    tiles: {
        gap: 12,
    },
    qrOuter: {
        alignSelf: 'center',
        marginTop: 18,
        padding: 16,
        borderRadius: 30,
        backgroundColor: Colors.sheetBackground,
    },
    qrInner: {
        padding: 16,
        borderRadius: 22,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
    },
});
