import React from 'react';
import { I18nManager, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../core/theme/colors';
import LotusGlow from '../../../../assets/icons/lotusGlow';
import AppTitle from '../../../../core/components/typography/AppTitle';
import { Typography } from '../../../../core/theme/typography';

const FeaturedEventCard = () => {
    const isRTL = I18nManager.isRTL;

    return (
        <View style={[styles.featuredCard, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={styles.featuredText}>
                <View style={styles.featuredPill}>
                    <Text style={styles.featuredPillText}>FEATURED EVENT</Text>
                </View>

                <AppTitle
                    title={'The Next Era of\nNutrition & Health'}
                    size={20}
                    color={Colors.white}
                    weight="extraBold"
                    style={{ lineHeight: 26, marginTop: 14, textAlign: isRTL ? 'right' : 'left' }}
                />

                <Text style={[styles.featuredMeta, { textAlign: isRTL ? 'right' : 'left' }]}>May 22 - 23, 2026  •  Dubai, UAE</Text>
            </View>
            <View style={[styles.featuredGlow, { marginRight: isRTL ? 0 : -8, marginLeft: isRTL ? -8 : 0 }]}>
                <LotusGlow />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    featuredCard: {
        alignItems: 'center',
        marginTop: 18,
        padding: 18,
        borderRadius: 24,
        backgroundColor: Colors.featureCardBackground,
        borderWidth: 1,
        borderColor: Colors.featureCardBorder,
    },
    featuredText: {
        flex: 1,
    },
    featuredPill: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.gold,
    },
    featuredPillText: {
        color: Colors.gold,
        fontSize: 9,
        fontFamily: Typography.bold,
        letterSpacing: 1,
    },
    featuredMeta: {
        marginTop: 12,
        color: Colors.whiteSoftAlt2,
        fontSize: 11,
        fontFamily: Typography.medium,
    },
    featuredGlow: {
        width: 96,
        height: 96,
        marginRight: -8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FeaturedEventCard;
